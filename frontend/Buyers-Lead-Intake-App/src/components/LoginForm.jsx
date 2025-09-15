import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({setIsLoggedIn, userType, signup, setSignup}) => {

    const navigate = useNavigate(); 
    
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    console.log({userType, userEmail, userPassword})
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await fetch("http://localhost:4000/login", {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword
                })
            })
            const data = await response.json();
            if(data.login){
                alert(data.message);
                // console.log("Logger Details : ")
                // console.log(data.details);
                localStorage.setItem("user", JSON.stringify(data.details));
                setIsLoggedIn(true);
                // const navigate = useNavigate();
                navigate('/dashboard')
                return ;
            }
            alert(data.message);
            
        }
        catch(err){
            return console.log("ERROR IN CONNECTING TO BKND (TRY TO START BKND) : "+err.message)
        }
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <FormControl className='p-3'>
            <FormLabel>Email</FormLabel>
            <Input value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} name="email" type="email" placeholder="johndoe@email.com" required />
        </FormControl>
        <FormControl className='p-3'>
            <FormLabel>Password</FormLabel>
            <Input value={userPassword} onChange={(e) => {setUserPassword(e.target.value)}} name="password" type="password" placeholder="password" required />
        </FormControl>
        <div className='p-3'>
            <Button type='submit' className='w-full'>Login</Button>
        </div>
        <div className='p-3 flex gap-1'>
            <div>New to the Website ? </div> <div className='text-blue-500 cursor-pointer' onClick={() => {setSignup(!signup)}}>Sign Up Here</div>
        </div>
    </form>
  )
}

export default LoginForm