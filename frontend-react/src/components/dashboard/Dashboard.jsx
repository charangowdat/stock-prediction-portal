import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'

function Dashboard() {
  const [data, setData] = useState('')
  
  useEffect(()=>{
    
    const fetchProtectedData = async ()=>{
      try{
        const response = await axiosInstance.get('/protected-view/')
        console.log('Success =>',response.data)
        setData(response.data.status)
      }catch(error){
        console.log(error.response.data)
        setData('Invalid or expired token')
      }
    }
    fetchProtectedData();
  },[])
  return (
    <>
      <div className='text-white container'>Dashboard {data}</div>
    </>
  )
}

export default Dashboard
