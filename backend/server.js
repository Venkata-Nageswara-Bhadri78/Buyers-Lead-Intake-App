// -------------------- CONNECTION REQUIRES AND IMPORTS ----------------------

const { OPEN_READWRITE } = require('sqlite3');
const { v4: uuidv4 } = require('uuid');
const sqlite = require('sqlite3').verbose();

// Connect to the File
const db = new sqlite.Database('./app.db', sqlite.OPEN_READWRITE, (err) => {
    if(err){
        return console.log("Error in Connecting to DB: "+err.message);
    }
    return console.log("DATA BASE CONNECTION SUCESS")
});
// Requires like Express
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// PASSWORD HASHING
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const { rejects } = require('assert');
const saltRounds = 10;

// ----------------------------------------- CREATING TABLES ------------------------
const create_credentials_table = `CREATE TABLE IF NOT EXISTS USER_CREDENTIALS (
        uuid TEXT PRIMARY KEY,
        fullname TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        type TEXT CHECK(type IN ('user', 'admin')) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
db.run(create_credentials_table, [], (err) => {
    if(err){
        return console.log("Error in Creating the USER_CREDENTIALS table");
    }
    return console.log("INITIAL : SUCCESS USER_CREDENTIAlS TABLE CREATION")
})


 // ----------------------- BUYERS TABLE TO DISPLAY AT DASHBOARD

const dashboard_table = `CREATE TABLE IF NOT EXISTS BUYERS (
    id TEXT PRIMARY KEY,
    fullName TEXT NOT NULL CHECK(length(fullName) BETWEEN 2 AND 80),
    email TEXT,
    phone TEXT NOT NULL CHECK(length(phone) BETWEEN 10 AND 15),
    city TEXT CHECK(city IN ('Chandigarh','Mohali','Zirakpur','Panchkula','Other')),
    propertyType TEXT CHECK(propertyType IN ('Apartment','Villa','Plot','Office','Retail')),
    bhk TEXT CHECK(bhk IN ('1','2','3','4','Studio')),
    purpose TEXT CHECK(purpose IN ('Buy','Rent')),
    budgetMin INTEGER,
    budgetMax INTEGER,
    timeline TEXT CHECK(timeline IN ('0-3m','3-6m','>6m','Exploring')),
    source TEXT CHECK(source IN ('Website','Referral','Walk-in','Call','Other')),
    status TEXT DEFAULT 'New' CHECK(status IN ('New','Qualified','Contacted','Visited','Negotiation','Converted','Dropped')),
    notes TEXT,
    tags TEXT,
    ownerId TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    CHECK (budgetMax IS NULL OR budgetMin IS NULL OR budgetMax >= budgetMin)
);`

db.run(dashboard_table, (err) => {
    if (err) return console.error("Error creating table:", err.message);
    return console.log("INITIAL: Table 'buyers' is ready.");
});

app.post('/dashboard_table', async (req, res) => {

    try{
        const { pageNumber, sortBy, sortOrder } = req.body;

        const pageLimit = 10;
        const offsetCount = (pageNumber-1)*pageLimit;

        const safeColumns = ["fullName", "email", "phone", "city", 
            "propertyType", "bhk", "purpose", "budgetMin", "budgetMax",
            "timeline", "source", "status", "notes", "tags", "ownerId", "updatedAt"
        ]
        const sortColumnName = safeColumns.includes(sortBy) ? sortBy : 'updatedAt';

        // const columnRef = buyers[sortColumnName];

        const order = sortOrder === 'desc' ? 'DESC' : 'ASC';

        // const buyersData = await db.select().from(buyers)
        // .orderBy(sortOrder === 'asc' ? asc(columnRef) : desc(columnRef))
        // .limit(pageLimit)
        // .offset(offsetCount);
        // console.log(buyersData);

        // SELECT * FROM buyers
        // ORDER BY CAST(SUBSTR(fullName, 6) AS INTEGER) ASC;

        // const query = `
        // SELECT * FROM buyers
        // ORDER BY CASE 
        //     WHEN trim(${sortColumnName}) GLOB '*[0-9]*' THEN CAST(${sortColumnName} AS INTEGER)
        //     ELSE ${sortColumnName} END ${order} LIMIT ? OFFSET ?`;

        const query = `SELECT * 
            FROM buyers
            ORDER BY 
            CASE 
                WHEN trim(${sortColumnName}) GLOB '-*[0-9]*' 
                THEN 0 
                ELSE 1 
            END,
            CASE 
                WHEN trim(${sortColumnName}) GLOB '-*[0-9]*' 
                THEN CAST(${sortColumnName} AS INTEGER)
            END,
            ${sortColumnName} COLLATE NOCASE
            ${order}
            LIMIT ? OFFSET ?`

        
        db.all(query, [pageLimit, offsetCount], (err, rows) => {
            if (err) {
                return res.status(500).send({message: `Error InFetching DASHBOARD DATA : ${err.message}`})
            } 
            return res.status(200).send({data: rows, message: "DATA FETCH SUCCESS"})
        }); 
        
        // return res.status(200).json({data: buyersData, message: "DATA FETCH SUCESS"})
    }
    catch(err){
        return res.status(500).json({message: `ERROR IN DATA FETCH FILTER : ${err.message}`})
    }
})

// ----------------------------- FORM SUBMIT ----------------------------

app.post('/submit-form', (req, res) => {
    const { formInfo, isUpdateForm } = req.body;
    // console.log(formInfo);
    
    let query = '';

    const uuid = uuidv4();

    if(isUpdateForm){
        query = `UPDATE BUYERS 
            SET fullName=?, email=?, phone=?, city=?, 
                propertyType=?, bhk=?, purpose=?, budgetMin=?, budgetMax=?, timeline=?, 
                source=?, status=?, notes=?, tags=?, updatedAt=? 
            WHERE id=?`;
        
        // console.log("UPDATE")

        db.run(query, [formInfo.fullName, formInfo.email, formInfo.phone, formInfo.city,
            formInfo.propertyType, formInfo.bhk, formInfo.purpose, formInfo.minBudget, formInfo.maxBudget, formInfo.timeline,
            formInfo.source, formInfo.status, formInfo.notes, formInfo.tags.join(','), formInfo.updatedAt,
            formInfo.id 
        ], (err) => {
            if(err){
                res.status(500).send({success: false, message: `ERROR IN UPDATING THE DATA : ${err.message}`})
            }
            res.status(200).send({success: true, message: "ROW UPDATED SUCESSFULLY"})
        })

        // const history_table = `CREATE TABLE IF NOT EXISTS HISTORY_TRACKER (
        //     history_id TEXT PRIMARY KEY,
        //     owner_id TEXT NOT NULL,
        //     row_uuid TEXT NOT NULL,
        //     changed_at TEXT DEFAULT CURRENT_TIMESTAMP,
        //     history TEXT NOT NULL
        //     )`

        const add_history = `INSERT INTO HISTORY_TRACKER 
            (history_id, owner_id, row_uuid, changed_at, history) 
            values (?, ?, ?, ?, 'HISTORY')`;
        db.run(add_history, [uuid, formInfo.ownerId, formInfo.id, formInfo.updatedAt], (err) => {
            if(err){
                return console.log(`ERROR IN TRACKING HISTORY - ${err.message}`)
            }
            return console.log("UPDATED THE HISTORY TRACKER ALSO");
        })
    }
    else{
        query = `INSERT INTO BUYERS (id, fullName, email, phone, city,
            propertyType, bhk, purpose, budgetMin, budgetMax, timeline,
            source, status, notes, tags, ownerId, updatedAt
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        // console.log("INSERT");

        db.run(query, [uuid, formInfo.fullName, formInfo.email, formInfo.phone, formInfo.city,
            formInfo.propertyType, formInfo.bhk, formInfo.purpose, formInfo.minBudget, formInfo.maxBudget, formInfo.timeline,
            formInfo.source, formInfo.status, formInfo.notes, formInfo.tags.join(','), formInfo.ownerId, formInfo.updatedAt, 
        ], (err) => {
            if(err){
                res.status(500).send({success: false, message: `ERROR IN INSERTING DATA : ${err.message}`})
            }
            res.status(200).send({success: true, message: "ROW INSERTED SUCESSFULLY"})
        })
    }    
})

app.post('/history_records', (req, res) => {
    const { owner_id } = req.body;

    // console.log(owner_id);

    const query = `SELECT * FROM HISTORY_TRACKER where owner_id = ?`;
    db.all(query, [owner_id], (err, data) => {
        if(err){
            return res.status(500).send({success: false, message: `ERROR IN FETCHING DATA - ${err.message}`})
        }
        // console.log(data);
        return res.status(200).send({data: data, message: "SUCCESS HISTORY FETCH"})
    })

})
// ----------------------------- SIGN UP --------------------------------

app.post('/signup', async (req, res) => {
    try{
        const {fullname, email, password, type, createdAt, updatedAt} = req.body
        const uuid = uuidv4();

        if (!fullname || !email || !password || !type) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }

        const emailExists = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM user_credentials WHERE email=?", [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        if (emailExists) {
            return res.status(400).send({ success: false, message: "Email already exists" });
        }

        // console.log({uuid, fullname, email, password, type, createdAt, updatedAt})

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const insert_query = `insert into USER_CREDENTIALS
            (uuid, fullname, email, password, type, createdAt, updatedAt) 
            values (?, ?, ?, ?, ?, ?, ?)`
        db.run(insert_query, [uuid, fullname, email, hashedPassword, type, createdAt, updatedAt], (err) => {
            if(err){
                return res.status(500).send({success: false, message: `Error in Adding the Record : ${err.message}`})
            }
            return res.status(200).send({success: true, message: 'LogIn Sucessfull'})
        })
    }
    catch(err){
        return res.status(500).send({success: false, message: "Server Error "+err.message})
    }
})

// -------------------------------- LOGIN --------------------------
app.post('/login', (req, res) => {
    try{
        const {email, password } = req.body;

        db.get("select * from USER_CREDENTIALS where email = ?", [email], async (err, data) => {
            if(err){
                return res.status(500).send({login: false, message: "Error in Checking DATA BASE for Login"})
            }
            
            if(!data){
                return res.status(400).send({login: false, message: "USER NOT FOUND - TRY AGAIN"})
            }
            const hashedPassword = data.password;
            const comparePassword = await bcrypt.compare(password, hashedPassword)
            if(comparePassword){
                return res.status(200).send({login: true, message: `LOGIN SUCESS - WELCOME ${data.fullname}`, details: {
                    uuid: data.uuid, 
                    fullname: data.fullname, 
                    email: data.email, 
                    type: data.type, 
                    createdAt: data.createdAt, 
                    updatedAt: data.updatedAt
                }})
            }

            return res.status(200).send({login: false, message: "INCORRECT PASSWORD"})
        })
    }
    catch(err){
        res.status(500).send({login:false, message: `Failed to Login - SERVER ISSUE : ${err.message}`})
    }
})

// ---------------------- HISTORY DEFAULTS AND ACTIONS ---------------
const history_table = `CREATE TABLE IF NOT EXISTS HISTORY_TRACKER (
    history_id TEXT PRIMARY KEY,
    owner_id TEXT NOT NULL,
    row_uuid TEXT NOT NULL,
    changed_at TEXT DEFAULT CURRENT_TIMESTAMP,
    history TEXT NOT NULL
    )`
db.run(history_table, [], (err) => {
    if(err){
        return console.log("Error in HISTORY_TRACKING table Creation : "+err.message);
    }
})


// ---------------------- PRINTING REQUIREMENTS ---------------

// db.all("select * from USER_CREDENTIALS", [], (err, row) => {
//     if(err) {
//         return console.log("Error in Printing USER_CREDENTIALS: "+err.message);
//     }
//     return console.log(row);
// })

// ---------------------- PORT LISTENING ---------------
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

// ------------------------ EXAMPLE DATA INSERTION -----------------

const fs = require('fs');
const csv = require('csv-parser');
const { userInfo } = require('os');


// const results = [];
// fs.createReadStream('buyers_data.csv')
//   .pipe(csv())
//   .on('data', (row) => results.push(row))
//   .on('end', () => {
//     console.log('CSV converted to JSON:', results.length, 'records found.');

//     // Step 2: Insert JSON data into SQLite
//     const insertQuery = `
//       INSERT INTO buyers 
//       (id, fullName, email, phone, city, propertyType, bhk, purpose, budgetMin, budgetMax, timeline, source, status, notes, tags, ownerId, updatedAt)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     db.serialize(() => {
//       const stmt = db.prepare(insertQuery);
//       results.forEach(buyer => {
//         stmt.run(
//           buyer.id,
//           buyer.fullName,
//           buyer.email,
//           buyer.phone,
//           buyer.city,
//           buyer.propertyType,
//           buyer.bhk || null,
//           buyer.purpose,
//           buyer.budgetMin ? parseInt(buyer.budgetMin) : null,
//           buyer.budgetMax ? parseInt(buyer.budgetMax) : null,
//           buyer.timeline,
//           buyer.source,
//           buyer.status,
//           buyer.notes || null,
//           buyer.tags || null,
//           buyer.ownerId,
//           buyer.updatedAt
//         );
//       });
//       stmt.finalize(() => {
//         console.log("All data inserted into SQLite successfully!");
//         db.close();
//       });
//     });
//   });


// db.all("SELECT * FROM buyers", [], (err, rows) => {
//     if (err) {
//       console.error("Error fetching data:", err.message);
//     } else {
//       console.log("All buyers data:");
//       rows.forEach(row => {
//         console.log(row);
//       });
//     }
//     // db.close(); // Close the connection
// }); 