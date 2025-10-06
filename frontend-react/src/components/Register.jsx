import React,{useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const BASE_URL = 'http://127.0.0.1:8000/'

  const handleRestration = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const userData = {
      username, email, password
    }

    try{
      const response = await axios.post(`${BASE_URL}api/v1/register/`, userData)
      console.log('User Created Successfully: ', response.data)
      setErrors({})
      setSuccess(true)
    }catch(error){
      setSuccess(false)
      setErrors(error.response.data)
      console.log('Error :', error.response.data)
    }finally{
      setLoading(false)
    }
  }


  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 bg-light-dark p-4 rounded'>
            <h3 className='text-light text-center mb-4'>Create an account</h3>
            <form onSubmit={handleRestration}>
              <input type="text" className='form-control ' required placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
              <small>{errors.username && <div className='text-danger'>&nbsp; {errors.username}</div>}</small>
              <input type="email" className='form-control mt-3'required placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
              <small>{errors.email && <div className='text-danger'>&nbsp; {errors.email}</div>}</small>
              <input type="password" className='form-control mt-3' required placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />
              <small>{errors.password && <div className='text-danger'>&nbsp; {errors.password}</div>}</small>
              {success && <div className='alert alert-success mt-4' role="alert">Registration successful</div>}
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

export default Register
