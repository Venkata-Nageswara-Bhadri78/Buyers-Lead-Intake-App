import React, { useEffect, useState } from 'react'

import TagAutoComplete from '../ui/TagsAutoComplete';
import checkValidation from '../lib/formValidation';
import { useLocation } from 'react-router-dom';

const AddRecord = () => {

    const fieldStyle = 'flex flex-col p-2';
    const labelStyle = 'text-sm px-1';
    const inputStyle = 'border p-1.5 rounded-sm';

    const location = useLocation();
    const { updateData } = location.state || {};

    const [isUpdateForm, setIsUpdateForm] = useState(false)
    const [goToBackend, setGoToBackend] = useState(false);

    const [formData, setFormData] = useState({
        ownerId: JSON.parse(localStorage.getItem("user")).uuid,
        fullName : '',
        email : '',
        phone : '',
        city: '',
        propertyType: '',
        bhk: '',
        purpose: '',
        minBudget: '',
        maxBudget: '',
        timeline: '',
        source: '',
        status: 'New',
        notes: '',
        tags: [],
        updatedAt: new Date().toISOString()
      });
            
      useEffect(() => {
        if (updateData) {
          setIsUpdateForm(true);
          setFormData({
            id: updateData.id,
            ownerId: JSON.parse(localStorage.getItem("user")).uuid,
            fullName : updateData.fullName || '',
            email : updateData.email || '',
            phone : updateData.phone || '',
            city: updateData.city || '',
            propertyType: updateData.propertyType || '',
            bhk: updateData.bhk || '',
            purpose: updateData.purpose || '',
            minBudget: updateData.budgetMin ?? '',
            maxBudget: updateData.budgetMax ?? '',
            timeline: updateData.timeline || '',
            source: updateData.source || '',
            status: updateData.status || 'New',
            notes: updateData.notes || '',
            tags: updateData.tags ? updateData.tags.split(",") : [],
            updatedAt: new Date().toISOString()
          });
        }
      }, [updateData]);
      

    // console.log("FormData : ")
    // console.log(formData);
    // console.log("Updated Data : ")
    // console.log(updateData);
    // console.log(isUpdateForm)

    useEffect(() => {

        if (!goToBackend) return;

        const fetchFormSubmit = async () => {
            try{
                const response = await fetch("http://localhost:4000/submit-form", {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        formInfo: formData,
                        isUpdateForm: isUpdateForm
                    }),
                })
                const data = await response.json();
                alert(data.message)

                setFormData({
                    id: '',
                    ownerId: JSON.parse(localStorage.getItem("user")).uuid,
                    fullName : '',
                    email : '',
                    phone : '',
                    city: '',
                    propertyType: '',
                    bhk: '',
                    purpose: '',
                    minBudget: '',
                    maxBudget: '',
                    timeline: '',
                    source: '',
                    status: 'New',
                    notes: '',
                    tags: [],
                    updatedAt: new Date().toISOString()
                });

                setGoToBackend(false);
            }
            catch(err){
                return console.log("ERROR IN SUBMITTING THE FORM : "+err.message)
            }
        }
        fetchFormSubmit();
    }, [goToBackend])



    const handleSubmit = (e) => {
        e.preventDefault();
        const result = checkValidation(formData)
        if(result.success){
            setGoToBackend(true);
        }
        else{
            console.log(result.errors)
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <div className='w-3/5 p-2 shadow-2xl mx-auto bg-white rounded-md '>
            <div className='flex justify-center text-xl p-3 text-white bg-gray-600 rounded-md'>ENTER THE RECORD DETAILS</div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Enter Full Name</label>
                <input className={inputStyle} value={formData.fullName} onChange={(e) => {setFormData((prev) => ({...prev, fullName: e.target.value}))}} type='text' placeholder='Enter Your Full Name' />
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Enter Email</label>
                <input className={inputStyle} value={formData.email} onChange={(e) => {setFormData((prev) => ({...prev, email: e.target.value}))}} type='email' placeholder='Enter Email' />
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Enter Phone</label>
                <input className={inputStyle} value={formData.phone} onChange={(e) => {setFormData((prev) => ({...prev, phone:e.target.value}))}} type='tel' pattern="[0-9]{10,15}" placeholder='Enter Phone Number' />
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Select City</label>
                <select className={inputStyle}
                    value={formData.city}
                    onChange={(e) => {setFormData((prev) => ({...prev, city: e.target.value}))}}
                >
                    <option value='' disabled>SELECT CITY</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Mohali">Mohali</option>
                    <option value='Zirakpur'>Zirakpur</option>
                    <option value='Panchkula'>Panchkula</option>
                    <option value='Other'>Other</option>
                </select>
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Select Property Type</label>
                <select className={inputStyle} value={formData.propertyType}
                    onChange={(e) => {setFormData((prev) => ({...prev, propertyType: e.target.value}))}}
                >
                    <option value='' disabled>SELECT PROPERTY TYPE</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value='Plot'>Plot</option>
                    <option value='Office'>Office</option>
                    <option value='Retail'>Retail</option>
                </select>
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Select BHK Type</label>
                <select className={inputStyle} value={formData.bhk}
                    onChange={(e) => {setFormData((prev) => ({...prev, bhk: e.target.value}))}}
                >
                    <option value='' disabled>SELECT BHK</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='Studio'>Studio</option>
                </select>
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Select PURPOSE</label>
                <select className={inputStyle} value={formData.purpose} 
                    onChange={(e) => {setFormData((prev) => ({...prev, purpose: e.target.value}))}}
                >
                    <option value='' disabled>SELECT PURPOSE</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                </select>
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Enter Minimum Budget</label>
                <input className={inputStyle} type='number' value={formData.minBudget} onChange={(e) => {setFormData((prev) => ({...prev, minBudget: e.target.value==="" ? null : Number(e.target.value)}))}} min='0' step="1000" placeholder='Minimum Budget (INR)' />
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Enter Maximum Budget</label>
                <input className={inputStyle} type='number' value={formData.maxBudget} onChange={(e) => {setFormData((prev) => ({...prev, maxBudget: e.target.value==="" ? null : Number(e.target.value)}))}} min="0" step="1000" placeholder='Maximum Budeget (INR)' />
                {(formData.minBudget!=='' && formData.maxBudget!=='' && 
                formData.maxBudget <=formData.minBudget) && <div className='text-red-500 text-xs'>Max Bugdet should be Greater than Min Budget</div>}
            </div>

            {/* timeline (enum: 0-3m|3-6m|>6m|Exploring */}
            <div className={fieldStyle}>
                <label className={labelStyle}>Select Timeline</label>
                <select className={inputStyle} value={formData.timeline}
                    onChange={(e) => {setFormData((prev) => ({...prev, timeline: e.target.value}))}}
                >
                    <option value='' disabled>SELECT TIMELINE</option>
                    <option value="0-3m">0 - 3 Months</option>
                    <option value="3-6m">3 - 6 Months</option>
                    <option value=">6m">Greater than 6 Months</option>
                    <option value="Exploring">Exploring</option>
                </select>
            </div>

            {/* source (enum: Website|Referral|Walk-in|Call|Other) */}
            <div className={fieldStyle}>
                <label className={labelStyle}>Where did you find this ? </label>
                <select className={inputStyle} value={formData.source}
                    onChange={(e) => {setFormData((prev) => ({...prev, source:e.target.value}))}}
                >
                    <option value='' disabled>SELECT SOURCE</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Call">Call</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* status (enum: New|Qualified|Contacted|Visited|Negotiation|Converted|Dropped) – default New */}
            <div className={fieldStyle}>
                <label className={labelStyle}>What's your status ? </label>
                <select className={inputStyle} value={formData.status}
                    onChange={(e) => (setFormData((prev) => ({...prev, status: e.target.value})))}
                >
                    <option value="New">New</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Visited">Visited</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Converted">Converted</option>
                    <option value="Dropped">Dropped</option>
                </select>
            </div>
            
            <div className={fieldStyle}>
                <label className={labelStyle}>Enter notes you would like to include here</label>
                <textarea 
                    value={formData.notes} 
                    onChange={(e) => {setFormData((prev) => ({...prev, notes: e.target.value}))}} 
                    rows={5} 
                    className={inputStyle} 
                    type='text' 
                    placeholder='example' 
                />
            </div>

            <div className={fieldStyle}>
                <label className={labelStyle}>Enter Related Tags</label>
                <TagAutoComplete tags={formData.tags} setTags={(newTag) => {setFormData((prev) => ({...prev, tags: newTag}))}}/>
            </div>

            <div className={fieldStyle}>
                <button className='p-2 bg-black text-white' type='submit'>{updateData ? 'UPDATE RECORD' : 'ADD RECORD' }</button>
            </div> 
        </div>
    </form>
  )
}

export default AddRecord


/*
const [formData, setFormData] = useState({
    ownerId: JSON.parse(localStorage.getItem("user")).uuid,
    fullName : '',
    email : '',
    phone : '',
    city: '',
    propertyType: '',
    bhk: '',
    purpose: '',
    minBudget: '',
    maxBudget: '',
    timeline: '',
    source: '',
    status: 'New',
    notes: '',
    tags: [],
    // ownerId: userInfo.uuid,
    updatedAt: new Date().toISOString()
})
*/