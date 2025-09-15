import React, { useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


const SignUpForm = ({userType, signup, setSignup}) => {

    const [userFullName, setUserFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userCPassword, setUserCPassword] = useState("");
    // console.log({userFullName, userEmail, userPassword, userCPassword, userType})

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if(userPassword !== userCPassword){
            return alert("Password and Confirm Password Should Match - TRY AGAIN")
        }

        try{
            const response = await fetch("http://localhost:4000/signup", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    fullname: userFullName, 
                    email: userEmail, 
                    password: userPassword, 
                    type: userType, 
                    createdAt: getTimestamp(),
                    updatedAt: getTimestamp()
                })
            })
            const data = await response.json();
            if(data.success){
                setSignup(!signup)
                return alert("USER SIGNUP SUCESS");
            }
            else{
                return alert(data.message);
            }
        }
        catch(err){
            return console.log("Error In Signing Up : "+err.message)
        }

    }

    return (
    <form onSubmit={handleSubmit}>
        <FormControl className='p-3'>
            <FormLabel>Full Name</FormLabel>
            <Input value={userFullName} onChange={(e) => {setUserFullName(e.target.value)}} name="full_name" type="text" placeholder="John Doe" required />
        </FormControl>
        <FormControl className='p-3'>
            <FormLabel>Email</FormLabel>
            <Input value={userEmail} onChange={(e) => {setUserEmail(e.target.value)}} name="email" type="email" placeholder="johndoe@email.com" required />
        </FormControl>

        <FormControl className='p-3'>
            <FormLabel>Password</FormLabel>
            <Input value={userPassword} onChange={(e) => {setUserPassword(e.target.value)}} name="password" type="password" placeholder="password" required/>
        </FormControl>
        <FormControl className='p-3'>
            <FormLabel>Confirm Password</FormLabel>
            <Input value={userCPassword} onChange={(e) => {setUserCPassword(e.target.value)}} name="confirm_password" type="password" placeholder="password" required/>
        </FormControl>
        <div className='p-3'>
            <Button type='submit' className='w-full'>Sign Up</Button>
        </div>
        <div className='p-3 flex gap-1'>
            <div>Already Have Account ? </div> <div className='text-blue-500 cursor-pointer' onClick={() => {setSignup(!signup)}}>Login Here</div>
        </div>
    </form>
  )
}

export default SignUpForm

function getTimestamp() {
    const now = new Date();
    return now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, '0') + "-" +
        String(now.getDate()).padStart(2, '0') + " " +
        String(now.getHours()).padStart(2, '0') + ":" +
        String(now.getMinutes()).padStart(2, '0') + ":" +
        String(now.getSeconds()).padStart(2, '0');
}