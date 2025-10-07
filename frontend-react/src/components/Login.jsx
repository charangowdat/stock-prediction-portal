import React, {useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import axiosInstance from '../axiosInstance'
import {toast} from 'react-toastify'


function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {setIsLoggedIn} = useContext(AuthContext)


  const handleLogin = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const userData = {
      username, password
    }
    console.log(userData)
    try{
      const response = await axiosInstance.post('/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      console.log(response.data)
      setIsLoggedIn(true)
      toast.success('Logged in successfully!')
      navigate('/dashboard/')
    }catch(error){
      console.log(error.response.data)
      toast.error("Invalid username or password")
      setError("Invalid username or password")
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 bg-light-dark p-4 rounded'>
            <h3 className='text-light text-center mb-4'>Login</h3>
            <form onSubmit={handleLogin}>
              <input type="text" className='form-control ' required placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
              
              <input type="password" className='form-control mt-3' required placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <div className='text-danger'>{error}</div>}
              {loading ?
              (<button type="submit" className='btn btn-info d-block mx-auto mt-4' disabled><FontAwesomeIcon icon={faSpinner} spin />Please wait...</button>):
              (<button type="submit" className='btn btn-info d-block mx-auto mt-4'>Login</button>)
            }
            
              
            </form>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Login
