import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import LogoutButton from './LogoutButton'
import { NavLink } from 'react-router-dom'
import "./Costome.css"
import Menu from "../../assets/menu-bar-2.png"
import Logo from "../../assets/logo.jpg"

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const [isOpen, setIsOpen] = useState(false)
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },
        {
            name: "All Post",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
    ]
  return (
    <header className=' bg-yellow-100 py-3 shadow '>
        
            <nav className='flex'>
                <div className='mr-4'>
                  <img className="hidden sm:block w-12 h-12 ml-2" src={Logo} alt="Logo" />
                </div>
                <ul className='hidden ml-auto sm:flex space-x-8'>
                    {
                        navItems.map((navItem) => (
                          navItem.active ?(
                                <li key={navItem.name}>
                                  
                                  <NavLink
                                  className={({isActive}) => `inline-block px-6 py-2 relative text-gray-600 font-semibold text-lg sm:hover:text-gray-900 transition duration-300 group
                                    ${isActive ? "underline underline-offset-4 custom-underline decoration-yellow-300 text-gray-900" : "" }`} 
                                  to={navItem.slug}>
                                    {navItem.name}
                                </NavLink>
                               
                                </li>
                                ) : null
                            
                        ))
                    }
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
                <ul className='flex w-full items-center justify-between sm:hidden'>
                    <li>
                      <img className="w-12 h-12" src={Logo} alt="" />
                    </li>
                    <li> 
                      <button onClick={()=>setIsOpen(true)}>
                      <img className=" w-6 h-6 mr-3" src={Menu} alt="" />
                      </button>
                      
                    </li>
                </ul>
                {isOpen && (
              <div className="fixed inset-0 bg-yellow-100 bg-opacity-90 flex flex-col items-center justify-center z-40">
                <button onClick={()=>setIsOpen(false)} className='text-black text-2xl absolute left-5 top-5'>X</button>
                {
                        navItems.map((navItem) => (
                          navItem.active ?(
                                <li className="list-none" key={navItem.name}>
                                  <button onClick={()=>setIsOpen(false)}>
                                    <NavLink
                                      className={({isActive}) => `inline-block px-6 py-2 relative text-gray-600 font-semibold text-lg sm:hover:text-gray-900 transition duration-300 group
                                        ${isActive ? "underline underline-offset-4 custom-underline decoration-yellow-300 text-gray-900" : "" }`} 
                                      to={navItem.slug}>
                                        {navItem.name}
                                    </NavLink>
                                  </button>
                               
                                </li>
                          ) : null
                            
                        ))
                    }

              </div>
      )}
            </nav>
    </header>
  )
}

export default Header

