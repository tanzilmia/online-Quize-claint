
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';
import { CgProfile } from 'react-icons/cg';
import { AiFillHome } from 'react-icons/ai';
import { RxDashboard } from 'react-icons/rx';
import { RiLoginCircleLine } from 'react-icons/ri';
import { SiGnuprivacyguard } from 'react-icons/si';
import { GiBrain } from 'react-icons/gi';
import '../cssFiles/nav.css'
const Navbar = () => {
  const naviget = useNavigate()
  const {user,logout,setloading} = useContext(mycontext)
  const handlelogout = () =>{
    logout()
    naviget('/')
  }
  
  return (
    
  <div className='nav_menu'>
    <ul>
      {
         user?.email ? <>
         <li> <Link to = '/profile'> <span className='mr-4'> <CgProfile/> </span> My Profile</Link> </li>
         </>
         :
         <>
          <li> <Link to = '/login'> <span className='mr-4'> <RiLoginCircleLine/> </span> Login</Link> </li>
         </>
      }
      <hr className='border_line' />
      <li> <Link to = '/'> <span className='mr-4'> <AiFillHome/> </span> Home</Link> </li>
      {
         user?.role === "admin" &&
         <li> <Link to = '/dashboard'> <span className='mr-4'> <RxDashboard/> </span> Dashboard</Link> </li>
      }
      
      {
        !user?.email ? <>
        <li> <Link to = '/register'> <span className='mr-4'> <SiGnuprivacyguard/> </span> Register</Link> </li>
        </>
        :
        <>
        <li> <Link to = '/quize'> <span className='mr-4'> <GiBrain/> </span>  Quize</Link> </li>
        <button className='logout_btn flex items-center' onClick={handlelogout}><span className='mr-4'> <RiLoginCircleLine/></span> Logout  </button>
        </>
      }
      
    </ul>
  </div>
  );
};

export default Navbar;