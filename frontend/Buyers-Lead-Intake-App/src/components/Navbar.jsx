import React from 'react'
import { CgProfile } from "react-icons/cg";

import { Link } from 'react-router-dom';

const Navbar = ({ setStoredUser }) => {

    const styling = 'w-full flex py-1 justify-center px-4 bg-blue-300 shadow-4xl border rounded-4xl';
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // console.log(storedUser.fullname)
    let profileName = 'Guest'
    if(storedUser){
        profileName = storedUser.fullname;
    }

    const handleSignout = () => {
        localStorage.removeItem("user");
        setStoredUser(null);
        navigate("/"); 
    }

    return (
        <div className='flex p-4 bg-black text-white justify-between'>
            <div className='flex gap-3 items-center'>
                <Link to={'/dashboard'}><div><CgProfile size={30} /></div></Link>
                <div className='text-2xl'>Welcome {profileName}</div>
            </div>
            <div className='flex items-center justify-around gap-6 w-7/10'>
                <Link to={'/dashboard'}><div className={styling}>Home</div></Link>
                <Link to='/new'><div className={styling}>Add Item</div></Link>
                <Link to='/history'><div className={styling}>History</div></Link>
                <Link to='/file-Import-Export'><div className={styling}>Import/Export</div></Link>
                <Link to='/'><div onClick={handleSignout} className={styling}>LogOut</div></Link>
            </div>
        </div>
    )
}

export default Navbar