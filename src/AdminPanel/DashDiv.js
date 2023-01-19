import React from 'react';
import { Link } from 'react-router-dom';
import '../cssFiles/DashDiv.css'
const DashDiv = ({item}) => {
    const {title,url,uniquStyle} = item
    return (
        <div className={uniquStyle}>
            <h2 className='title'>{title}</h2>
            <Link className='linktag' to ={url}> Viste </Link>
        </div>
    );
};

export default DashDiv;