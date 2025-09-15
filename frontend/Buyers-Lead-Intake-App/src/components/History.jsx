import React, { useEffect, useState } from 'react'
import PageBar from '../ui/PageBar';

const History = () => {

  const headerStyling = 'py-2 px-2.5 border cursor-pointer';
  const searchBarStyle = 'p-1 border';
  const inputStyling = 'border p-1';
  const rowStyling = 'p-1 border';

  const owner_id = JSON.parse(localStorage.getItem("user"))?.uuid

  // console.log("OWNER: "+owner_id);
  // const history_table = `CREATE TABLE IF NOT EXISTS HISTORY_TRACKER (
  //     history_id TEXT PRIMARY KEY,
  //     owner_id TEXT NOT NULL,
  //     row_uuid TEXT NOT NULL,
  //     changed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  //     history TEXT NOT NULL
  //     )`
  // console.log(owner_id)
  const [filteredData, setFilteredData] = useState([]);

  const [pageBarNumber, setPageBarNumber]= useState(2);
  const [pageNumber, setPageNumber] = useState(1);
  
  

  useEffect(() => {
    const historyFetch = async () => {
      try{
        const response = await fetch("http://localhost:4000/history_records", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({owner_id: owner_id})
        });
        const { data } = await response.json();
        setFilteredData(data);

      }
      catch(err){

      }
    }

    historyFetch()
  }, []);

  // console.log(filteredData);

  return (
    <div className='min-h-screen w-full'>
      <table className='w-full text-[7px] table-auto border-collapse'>
        <thead>
          <tr>
            <th className={headerStyling}>HISTORY VERSION</th>
            <th className={headerStyling}>OWNER_ID</th>
            <th className={headerStyling}>ROW UUID</th>
            <th className={headerStyling}>UPDATED AT</th>
            <th className={headerStyling}>HISTORY</th>
          </tr>
        </thead>
        {/* BODY OF THE TABLE */}
        <tbody>
          {(filteredData || []).map(row => {
            return (
                <tr key={row.history_id}>
                  <td className={rowStyling}>{row.history_id}</td>
                  <td className={rowStyling}>{row.owner_id}</td>
                  <td className={rowStyling}>{row.row_uuid}</td>
                  <td className={rowStyling}>{row.changed_at}</td>
                  <td className={rowStyling}>{row.history}</td>
                </tr>
            )
          })}
        </tbody>
      </table>
      <div className='p-6 flex justify-center w-full'>
        <PageBar pageBarNumber={pageBarNumber} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  )
}

export default History