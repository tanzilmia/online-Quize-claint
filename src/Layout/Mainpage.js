import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import './mainpage.css'

const Mainpage = () => {
    return (
        <div className='main_layout flex'>
            <div className='navbar_wrapper w-2/12'>
            <Navbar/>
            </div>
            <div className='outlet w-10/12'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Mainpage;