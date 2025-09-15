import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

import { FaRegUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";


const AuthenticationForm = ({setIsLoggedIn, userType, setUserType}) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [signup, setSignup] = React.useState(true);
  // console.log(userType)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setUserType('user');
    } else if (newValue === 1) {
      setUserType('admin');
    }
  };

  return (
    <div className='flex justify-center items-center pt-6'>
      <Tabs
        variant="outlined"
        aria-label="Referral Type"
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ width: 343, borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }}
      >
        <TabList
          disableUnderline
          tabFlex={1}
          sx={{
            [`& .${tabClasses.root}`]: {
              fontSize: 'sm',
              fontWeight: 'lg',
              [`&[aria-selected="true"]`]: {
                color: 'primary.500',
                bgcolor: 'background.surface',
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: '-4px',
              },
            },
          }}
        >
          <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
            USER <FaRegUser />
          </Tab>
          <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
            ADMIN <MdAdminPanelSettings />
          </Tab>
        </TabList>

        <TabPanel value={0}>
          {signup ? <SignUpForm userType={userType} signup={signup} setSignup={setSignup}/> : <LoginForm setIsLoggedIn={setIsLoggedIn} userType={userType} signup={signup} setSignup={setSignup}/>}
        </TabPanel>
        <TabPanel value={1}>
          {signup ? <SignUpForm userType={userType} signup={signup} setSignup={setSignup}/> : <LoginForm setIsLoggedIn={setIsLoggedIn} userType={userType} signup={signup} setSignup={setSignup}/>}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AuthenticationForm;
