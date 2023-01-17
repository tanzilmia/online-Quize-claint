import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';

const Home = () => {
    const {user} = useContext(mycontext)  
    return (
        <div className='text-center'>
             
            <h2>Improve Your Skills With Quize Game {user?.email}  </h2>
            <h2 className='text-lime-500 text-3xl'>EveryDay You Can Give 50 Answer </h2>
             
             <Link className='btn btn-primary my-5' to ='/quize'> Play Now  </Link>

        </div>
    );
};

export default Home;