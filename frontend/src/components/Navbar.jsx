import React from 'react'
import { Link } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'

const Navbar = () => {
    const user = false
  return (
    <div>
      <div className='flex items-center justify-between h-[10vh] bg-[#E2E8F0]'>
        <h1 className='text-xl'><Link to='/'>Medium Clone</Link></h1>
        <div className='flex justify-center'>
            {/* <p><BsSearch/></p> */}
            <input className="outline-none px-3 " placeholder="Search a post" type="text"/>
        </div>


        <div className='flex text-red-600 justify-end px-10 '>
           {user? <h3 to='Write'>Write</h3>:<h3><Link to='/login'> Login</Link></h3>} 
           
           {user? <h3 to='profile'>Profile</h3>:<h3><Link to='/register'> register</Link></h3>} 
           
        </div>
      </div>
    </div>
  )
}

export default Navbar
