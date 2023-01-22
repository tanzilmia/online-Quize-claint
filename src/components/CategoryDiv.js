import React from 'react';
import { Link } from 'react-router-dom';
import '../cssFiles/DashDiv.css'

const CategoryDiv = ({category}) => {
    const {_id,categoryName} = category
    return (
        <div className='divtwo'>
            <h2 className='title'>{categoryName}</h2>
            <Link className='start_quize' to = {`/playQuize/${categoryName}`}> Start Quize </Link>
        </div>
    );
};

export default CategoryDiv;