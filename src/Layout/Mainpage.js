import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import './mainpage.css'

const Mainpage = () => {
    return (
        <div className='main_layout flex md:flex-row lg:flex-row sm:flex-col-reverse flex-col-reverse'>
            <div className='navbar_wrapper md:w-2/12 lg:w-2/12 sm:w-full md:fixed lg:fixed sm:relative top-0'>
            <Navbar/>
            </div>
            <div className='outlet md:ml-[225px] lg:ml-[225px] w-10/12'>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Mainpage;