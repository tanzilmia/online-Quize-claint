import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PlayQuize = () => {
    const quizeData = useLoaderData()
    console.log(quizeData)
    const {categoryName} = quizeData?.data[0]
    return (
        <div>
            <h2>playing Quize {categoryName} for Free   </h2> 
        </div>
    );
};

export default PlayQuize;