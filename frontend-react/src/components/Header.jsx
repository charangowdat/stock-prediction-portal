import {useContext} from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { toast } from 'react-toastify'


const header = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    navigate('/login')
    toast.warning("You have logged out!")
  }

  return (
    <>
      <nav className='navbar container pt-3 pb-3 align-items-start'>
        <Link className='navbar-brand text-light' to='/'>Stock Prediction Portal</Link>

        <div>
          {isLoggedIn ? (
            <>
              <Button text='Dashboard' class='btn-info' url='dashboard/' />&nbsp;
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </>
          ):(
            <> 
            <Button text='Login' class='btn-outline-info' url='login/' />
            &nbsp;
            <Button text='Register' class='btn-info' url='register/' />
            </>
          )}
          
        </div>
      </nav>
    </>
  )
}

export default header
