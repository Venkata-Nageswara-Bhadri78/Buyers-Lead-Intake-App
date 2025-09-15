import React, { useEffect, useState } from 'react'
import Pagination from '../ui/PageBar';
import PageBar from '../ui/PageBar';
import TableBody from './TableBody';

import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import SearchFunctionality from './SearchFunctionality';


const DashBoard = ({userInfo, setStoredUser}) => {
  
  // console.log("Login USER : ")
  // console.log(userInfo)

  const [dashboardData, setDashboardData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [pageBarNumber, setPageBarNumber]= useState(2);

  useEffect(() => {
    const fetchPageData = async () => {
      try{
        const response = await fetch("http://localhost:4000/dashboard_table", {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            pageNumber: pageNumber,
            sortBy: sortBy,
            sortOrder: sortOrder
          })
        })
        const {data} = await response.json();
        setPageBarNumber(data.length)
        setDashboardData(data)
      }
      catch(err){
        console.log("ERROR IN CONNECTING TO DB (BACK-END) (TRY TO START BKND): "+err.message)
      }
    }
    fetchPageData();
  }, [pageNumber, sortBy, sortOrder]);

  // console.log(dashboardData);
  // console.log(dashboardData);

  const headerStyling = 'py-2 px-2.5 border cursor-pointer bg-green-400';
  const searchBarStyle = 'p-1 border';
  const inputStyling = 'border p-1';


  const handleSort = (column) => {
    setPageNumber(1);
    if(sortBy === column){
      setSortOrder(sortOrder==='asc' ? 'desc' : 'asc')
    }
    else{
      setSortBy(column)
      setSortOrder('asc')
    }
  }
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("user");
    setStoredUser(null);
    navigate("/"); 
  }
  // console.log(sortBy + " ---- "+sortOrder);
  return (
    <div className=' w-full'>
{/* 
      <div className='flex p-2'>
        <div onClick={handleSignout} className='p-2 rounded-2xl bg-black text-white w-20 flex justify-center'>
          <BiLogOut />
        </div>
      </div> */}
      <div>
        <SearchFunctionality />
      </div>
      <h1 className='p-1 text-center bg-blue-300 text-xl text-'>Click on a column header to toggle sorting (ascending ↔ descending)</h1>
      <table className='w-full text-[9px] table-auto border-collapse'>
        <thead>
          <tr>
            <th onClick={() => {handleSort("fullName")}} className={headerStyling}>FULL NAME</th>
            <th onClick={() => {handleSort("email")}} className={headerStyling}>EMAIL</th>
            <th onClick={() => {handleSort("phone")}} className={headerStyling}>PHONE</th>
            <th onClick={() => {handleSort("city")}} className={headerStyling}>CITY</th>
            <th onClick={() => {handleSort("propertyType")}} className={headerStyling}>PROPERTY TYPE</th>
            <th onClick={() => {handleSort("bhk")}} className={headerStyling}>BHK</th>
            <th onClick={() => {handleSort("purpose")}} className={headerStyling}>PURPOSE</th>
            <th onClick={() => {handleSort("minBudget")}} className={headerStyling}>BUDGET MIN</th>
            <th onClick={() => {handleSort("maxBudget")}} className={headerStyling}>BUDGET MAX</th>
            <th onClick={() => {handleSort("timeline")}} className={headerStyling}>TIMELINE</th>
            <th onClick={() => {handleSort("source")}} className={headerStyling}>SOURCE</th>
            <th onClick={() => {handleSort("status")}} className={headerStyling}>STATUS</th>
            <th onClick={() => {handleSort("notes")}} className={headerStyling}>NOTES</th>
            <th onClick={() => {handleSort("tags")}} className={headerStyling}>TAGS</th>
            <th onClick={() => {handleSort("ownerId")}} className={headerStyling}>OWNER ID</th>
            <th onClick={() => {handleSort("updatedAt")}} className={headerStyling}>UPDATED AT</th>
            <th className={headerStyling}>VIEW AND EDIT</th>
          </tr>
        </thead>
        {/* BODY OF THE TABLE */}
        <TableBody filteredData = {dashboardData} userInfo={userInfo} />
      </table>
      <div className='p-6 flex justify-center w-full'>
        <PageBar pageBarNumber={pageBarNumber} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  )
}

export default DashBoard