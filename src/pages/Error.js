import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h2 className='text-4xl'>404 Page Not Found .</h2>
            <Link to = '/' className='btn'>Back To Home</Link>
        </div>
    );
};

export default Error;