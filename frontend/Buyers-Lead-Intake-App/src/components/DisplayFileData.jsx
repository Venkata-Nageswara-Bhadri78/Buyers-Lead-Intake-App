import React, { useState } from 'react'

import zodValidation from '../lib/zodValidation'
import DisplayFileBody from './DisplayFileBody';

const DisplayFileData = ({ data, setErrorCount }) => {

  const rowStyling = 'border p-1';
  const headerStyling = 'p-1 border';
  const handleSort = (name) => {
    console.log(name)
  }

  const checkValid = (columnName, value) => {
    const result = zodValidation(columnName, value);
    if (result.success) {
      return value; 
    }
    return <div className="text-red-500">{result.message}</div>;
  };


  return (
    <table className='text-sm'>
      {data && data.length > 0 && (
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
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((row, index) => {
          return (
            <DisplayFileBody setErrorCount={setErrorCount} key={index} rowData={row}/>
          )
        })}
      </tbody>
    </table>
  )
}

export default DisplayFileData