import React from 'react';
import DashDiv from './DashDiv';
import '../cssFiles/DashDiv.css'

const DashBoard = () => {
    const dashboard = [
        {
            title: "Insert Quize",
            url: "/dashboard/addQuize",
            commonClass : "commonStyle",
            uniquStyle: "divone"
        },
        {
            title: "All User",
            url: "/dashboard/userinfo",
            commonClass : "commonStyle",
            uniquStyle: "divtwo"

        },
        {
            title: " User Histry",
            url: "/dashboard/userHistory",
            commonClass : "commonStyle",
            uniquStyle: "divthree"

        },
        {
            title: " Quize Setting",
            url: "/dashboard/settings",
            commonClass : "commonStyle",
            uniquStyle: "divfour"

        },
    ]
    return (
        <div>
            <h2>DashBoard Page</h2>
           <div className='grid grid-cols-3 gap-4 dashboard_wrapper'>
           {
                dashboard.map(item => <DashDiv item = {item}/>)
            }
           </div>
        </div>
    );
};

export default DashBoard;