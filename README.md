# Mini Buyer Lead Intake App

A small app to **capture, list, and manage buyer leads** with validation, search/filter, and CSV import/export. Built as an internship assignment to showcase full-stack development using React.js, JavaScript, Zod and a relational database.

---

## Features

- **Authentication:** Login for user and admin
- **Dashboard:** Table view of buyers with sortable columns
- **Ownership & Roles:**
  - Users can edit only their own leads
  - Admin can edit all leads
- **Edit History:** Changes tracked in `buyer_history` table
- **CSV Import/Export:** Upload CSV files (max 200 rows) with row-level validation and error display
- **Filters & Search:** Debounced search by name, email, phone; filters by city, property type, status, and timeline (need to complete)
- **Validation:** Zod validation both client and server-side
- **Pagination:** Server-side pagination with 10 rows per page

---

## Tech Stack

- **Frontend:** React.js, React, JavaScript
- **Backend / DB:** express.js, node.js, SQLite
- **Validation:** Zod
- **Auth:** Magic link or demo login
- **Version Control:** Git with meaningful commits

---

## Database Schema

**USER_CREDENTIALS**
- `uuid` (TEXT, Primary Key)  
- `fullname` (TEXT, Not Null)  
- `email` (TEXT, Unique, Not Null)  
- `password` (TEXT, Not Null)  
- `type` (TEXT, Not Null, enum: `user`, `admin`)  
- `createdAt` (TIMESTAMP, defaults to CURRENT_TIMESTAMP)  
- `updatedAt` (TIMESTAMP, defaults to CURRENT_TIMESTAMP)  


**buyers**
- `id` (uuid)  
- `fullName` (string, 2–80)  
- `email` (email, optional)  
- `phone` (string, 10–15; required)  
- `city` (enum: Chandigarh, Mohali, Zirakpur, Panchkula, Other)  
- `propertyType` (enum: Apartment, Villa, Plot, Office, Retail)  
- `bhk` (enum: 1,2,3,4,Studio; optional if non-residential)  
- `purpose` (Buy, Rent)  
- `budgetMin` (int, optional)  
- `budgetMax` (int, optional; ≥ `budgetMin`)  
- `timeline` (0-3m, 3-6m, >6m, Exploring)  
- `source` (Website, Referral, Walk-in, Call, Other)  
- `status` (New, Qualified, Contacted, Visited, Negotiation, Converted, Dropped)  
- `notes` (text, ≤1000 chars, optional)  
- `tags` (string[], optional)  
- `ownerId` (user id)  
- `updatedAt` (timestamp)  

**buyer_history**
- `id` (uuid)  
- `buyerId`  
- `changedBy` (user id)  
- `changedAt` (timestamp)  
- `diff` (JSON of changed fields)

---

## Local Setup

1. **Clone the repo**
```bash
git clone https://github.com/Venkata-Nageswara-Bhadri78/Buyers-Lead-Intake-App.git
cd Buyers-Lead-Intake-App.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Frontend** (move to backend folder and run)
```bash
npm install
npm run dev
```

4. **backend Setup** (move to frontend/Buyers-Lead-Intake-App folder and run)
```bash
npm install
node server.js
```

5. **The frontend will give the live link**
```bash
http://localhost:4000
```

6. **Go with the project exploration**

- Click on the link that will send you to browser and explore the project by signing up and login.

## What’s Done & What’s Missed

| Feature / Task | Status |
|----------------|--------|
| Login for user | ✅ |
| Login for admin | ✅ |
| Dashboard table view | ✅ |
| Column sorting | ✅ |
| Ownership & role-based edit | ✅ |
| Edit history tracking | ✅ |
| CSV import with row-level validation | ✅ |
| CSV export | ✅ |
| Debounced search (name, email, phone) | ❌ |
| Pagination (server-side, 10 rows per page) | ✅ |
| Client-side Zod validation | ✅ |
| Server-side Zod validation | ✅ |
| Concurrency check on edit (updatedAt) | ❌ |
| Error boundary | ✅ |
| Unit test for validator | ❌ |
| Accessibility basics | ❌ |

## Final Note

Thank you for the opportunity to work on this project. I have completed a significant portion and will continue to update the repository with the remaining tasks.  

I appreciate your time and consideration.  

Thank you!
