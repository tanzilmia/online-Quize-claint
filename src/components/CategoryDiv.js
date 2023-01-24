import moment from 'moment/moment';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { mycontext } from '../contextApi/Authcontext';
import '../cssFiles/DashDiv.css'


const CategoryDiv = ({category}) => {
    const {user,settingsData} = useContext(mycontext);
    const [{dayliQuize,timer}] = settingsData.settings;
    const {categoryName} = category;
    const date = moment().format("MMM Do YY");
   const [userInfo, setdailyUserInfo] = useState({});

   console.log(categoryName);

    const currentQuestion = 0;
    const score = 0;
    const rightAns = 0;
    const wrongAns = 0;

    const userData = {
        email : user.email,
        categoryName,
        date,
        currentQuestion,
        score,
        rightAns,
        wrongAns
    }

    const handleStartQuize = ()=>{
      try{

        fetch(`http://localhost:5000/store-daily-quize`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(userData)
           })
           .then(res=> res.json())
           .then(data => {console.log(data)})
      }
      catch(err){console.log(err)}
    }

    return (
        <div className='divtwo'>
            <h2 className='title'>{categoryName}</h2>
           

         <Link onClick={handleStartQuize} className='start_quize' to = {`/playQuize/${categoryName}`}> Start Quize </Link>
            
        </div>
    );
};

export default CategoryDiv;