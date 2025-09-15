import React from 'react'

const SearchFunctionality = () => {
  return (
    <div className='w-full bg-gray-400 p-4 flex justify-center gap-4'>
        <input  className='bg-white p-2 w-1/3 rounded-sm outline-none border' type='text' placeholder={`Needs update (not working).`} />
        <select className='p-2 bg-white border outline-none rounded-sm'>
            <option value='' disabled>SELECT COLUMN</option>
            <option value="">FULL NAME</option>
            <option value="">EMAIL</option>
            <option value="">PHONE</option>
            <option value="">CITY</option>
            <option value="">PROPERTY TYPE</option>
            <option value="">BHK</option>
            <option value="">PURPOSE</option>
            <option value="">MIN BUDGET</option>
            <option value="">MAX BUDGET</option>
            <option value="">TIMELINE</option>
            <option value="">SOURCE</option>
            <option value="">STATUS</option>
            <option value="">NOTES</option>
            <option value="">TAGS</option>
            <option value="">UPDATED AT</option>      
        </select>
    </div>
  )
}

export default SearchFunctionality