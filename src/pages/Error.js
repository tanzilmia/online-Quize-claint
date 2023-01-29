import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='flex flex-col items-center justify-center h-[100vh]'>
            <h2 className='text-4xl mb-5'> SomeThing is Wrong !!</h2>
            <Link to = '/' className='btn'>Back To Home</Link>
        </div>
    );
};

export default Error;