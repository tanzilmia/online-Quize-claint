import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';

const Navbar = () => {
  const {user,logout} = useContext(mycontext)

  const handlelogout = () =>{
    logout()
    .then(()=>{
      
    })
    .catch(()=>{})
  }
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link className="btn btn-ghost normal-case text-xl">Quize Game</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li> <Link to = '/'>Home</Link> </li>
     

      {
        !user?.email ? <>
        <li> <Link to = '/login'>Login</Link> </li>
        <li> <Link to = '/register'>Register</Link> </li>
        </>
        :
        <>
         <li> <Link to = '/quize'>Quize</Link> </li>
        <li> <Link to = '/profile'>Profile</Link> </li>
        <button onClick={handlelogout}>Logout</button>
        </>
      }
      
    </ul>
  </div>
</div>
  );
};

export default Navbar;