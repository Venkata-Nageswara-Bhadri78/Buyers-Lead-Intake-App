import { useEffect, useState } from 'react'
import AuthenticationForm from './components/AuthenticationForm'

import DashBoard from './components/DashBoard'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddRecord from './components/AddRecord';
import History from './components/History'
import FileImportExport from './components/FileImportExport';


function App() {
  const [userType, setUserType] = useState('user');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUser, setStoredUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

// console.log(storedUser);
  useEffect(() => {
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user"));
      setStoredUser(user);
      console.log("USER LOGIN SUCCESS AND DATA SAVED", user);
    }
  }, [isLoggedIn]);
  
  return (
    <div className=''>
      {storedUser && <Navbar setStoredUser={setStoredUser} />}
      <div className='p-4 min-h-screen-footer min-h-[calc(100vh-13rem)]'>
        <Routes>
          <Route path='/' element={<AuthenticationForm setIsLoggedIn={setIsLoggedIn} userType={userType} setUserType={setUserType} />} />
          <Route path='/dashboard' element={<DashBoard userInfo={storedUser} setStoredUser={setStoredUser} />} />
          <Route path='/new' element={<AddRecord />} />
          <Route path='/history' element={<History />} />
          <Route path='/file-Import-Export' element={<FileImportExport />} />
        </Routes>
      </div>
      {storedUser && <Footer />}
    </div>
  )
}

export default App
