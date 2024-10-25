import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/AuthSlice'
import { useNavigate } from 'react-router-dom'
// import "../assests/user.svg"

function LogoutButton() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
            navigate("/login")
        })
    }
  return (
    <button onClick={logoutHandler}
    className='inline-block px-6 py-2 relative text-gray-700 font-semibold text-lg hover:text-gray-900 transition duration-300 group'>
                {/* <img src={user} alt="Logout" width={24} height={24} /> */}
        <label className="bold-16 whitespace-nowrap cursor-pointer">Logout</label>
    </button>
  )
}

export default LogoutButton
