import React, {useState, useContext} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const BASE_URL = 'http://127.0.0.1:8000/'

  const handleLogin = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setError('')
    const userData = {
      username, password
    }
    console.log(userData)
    try{
      const response = await axios.post(`${BASE_URL}api/v1/token/`, userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      console.log(response.data)
      setIsLoggedIn(true)
      navigate('/')
    }catch(error){
      console.log(error.response.data)
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
              (<button type="submit" className='btn btn-info d-block mx-auto mt-4'>Register</button>)
            }
            
              
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
