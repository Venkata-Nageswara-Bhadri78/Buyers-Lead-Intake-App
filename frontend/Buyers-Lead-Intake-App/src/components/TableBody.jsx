import React from 'react'
import { MdEdit } from "react-icons/md";

import { Link } from 'react-router-dom';

const TableBody = ({filteredData, userInfo}) => {

  const rowStyling = 'border p-1';

  const displayEditButton = (row) => {

    if(userInfo.type === 'admin'){
      return true;
    }
    else if(userInfo.uuid===row){
      return true;
    }
    else{
      return false;
    }
  }
  // "a2733b57-db7c-45a4-8632-01d8ba64b6ba" - USER_UUID
  const searchBarStyle = '';
  const inputStyling = '';

  return (
    <tbody>
                {/* <tr>
            <th className={searchBarStyle}><input className={inputStyling} type='text' placeholder='Search'/></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
            <th className={searchBarStyle}><input className={inputStyling} type='text' /></th>
          </tr> */}
        {(filteredData || []).map(row => {
        return (
            <tr key={row.id}>
              <td className={rowStyling}>{row.fullName}</td>
              <td className={rowStyling}>{row.email}</td>
              <td className={rowStyling}>{row.phone}</td>
              <td className={rowStyling}>{row.city}</td>
              <td className={rowStyling}>{row.propertyType}</td>
              
              <td className={rowStyling}>{row.bhk}</td>
              <td className={rowStyling}>{row.purpose}</td>
              <td className={rowStyling}>{row.budgetMin}</td>
              <td className={rowStyling}>{row.budgetMax}</td>
              <td className={rowStyling}>{row.timeline}</td>
              <td className={rowStyling}>{row.source}</td>
              <td className={rowStyling}>{row.status}</td>
              <td className={rowStyling}>{row.notes}</td>
              <td className={rowStyling}>{row.tags}</td>
              <td className={rowStyling}>{row.ownerId}</td>
              <td className={rowStyling}>{row.updatedAt}</td>
              <td className={`border p-3`}>{displayEditButton(row.ownerId) && 
                <Link to='/new' state={{updateData: row}}><MdEdit size={20}/></Link>  
              }</td>
            </tr>
        )
        })}
    </tbody>
  )
}


export default TableBody