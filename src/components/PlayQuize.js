

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { mycontext } from "../contextApi/Authcontext";
import { MdOutlineAvTimer } from 'react-icons/md';
import '../cssFiles/PlayQuize.css'
import { set } from "react-hook-form";
const PlayQuize = () => {
  const {user,loading} = useContext(mycontext);
  const email = user?.email;
  const {settingsData} = useContext(mycontext);
   const [{dayliQuize,timer,icressPoint,decressPoint,autosubmitPoint}] = settingsData.settings;
   const [dailyUserInfo, setdailyUserInfo] = useState({})
   const {currentQuestion:dbCurrentQuestion,score:databegScore,rightAns,wrongAns} = dailyUserInfo;
   const date = moment().format("MMM Do YY");
   const neviget = useNavigate()
  const [wrong, setwrong] = useState(0);
  const [rigthAns, setrigthAns] = useState(0);
  const [score, setscore] = useState(0);
  const [autosubmit, setautosubmit] = useState(0);
   
  const [currentQuestion, setcurrentQuestion] = useState(0);
// dstructure quize general settings
  const [remainingTime, setRemainingTime] = useState(timer);
  const quizeData = useLoaderData();
  const quizes = quizeData?.data;
  const answer = quizes[currentQuestion]?.correctAnswer;
  const categoryName = quizes[currentQuestion]?.categoryName;

  try{
    useEffect(() => {
      if(dbCurrentQuestion <= dayliQuize){
        const interval = setInterval(() => {
          if (remainingTime === 0) {
              // call function to stop quiz
              setRemainingTime(timer)
              setcurrentQuestion(currentQuestion + 1);
              setwrong(wrong+1)
              setautosubmit(autosubmit + 1)
              setscore(score- autosubmitPoint)
              if(dbCurrentQuestion !==dayliQuize){
                try{
                  fetch(
                    `https://online-quize-server.vercel.app/auto-submit-quize`,
                    {
                      method: "PUT",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify({wrong,score,categoryName,date,email,currentQuestion,dayliQuize,autosubmitPoint,autosubmit}),
                    }
                  )
                    .then((res) => res.json())
                    .then((result) => {
                      console.log(result);
                      
                    });
                }catch(err) {}
              }
           
               
              return; 
            }
            setRemainingTime(remainingTime - 1);
            
      }, 1000);
      
      return () => clearInterval(interval);
      }
     
    }, [remainingTime,currentQuestion,timer,dayliQuize,wrong,score,categoryName,date,email,dbCurrentQuestion,autosubmitPoint,autosubmit]);
  }catch(err) {console.log(err)}
  
  // quize answer gettting
  const submitQuize = (option) => {
    if (option === answer) {
      alert("right answer");
      setcurrentQuestion(currentQuestion + 1);
      setRemainingTime(timer)
      setrigthAns(rightAns + 1)
      setscore(score + icressPoint)
      try{
        fetch(
          `https://online-quize-server.vercel.app/right-quize`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({score,categoryName,date,email,currentQuestion,dayliQuize,rigthAns,icressPoint}),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            
          });
      }catch(err) {}

    }
    if (option !== answer) {
      alert("wrong answer");
      setcurrentQuestion(currentQuestion + 1);
      setRemainingTime(timer)
      setwrong(wrong+1)
      setscore(score - decressPoint)
      try{
        fetch(
          `https://online-quize-server.vercel.app/wrong-quize`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({score,categoryName,date,email,currentQuestion,dayliQuize,wrong,decressPoint}),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            
          });
      }catch(err) {}

    }
  };


  if(currentQuestion <=dayliQuize){
    try{
      fetch(`https://online-quize-server.vercel.app/store-daily-quize?email=${user?.email}&date=${date}&categoryName=${categoryName}`)
      .then(res => res.json())
      .then(data => {
        setdailyUserInfo(data.data)
      })
     
    }catch(err) {console.log("Faield store-daily-quize data")}
  }

  


  if(loading){
    return <p>Loaddings</p>
   }

  return (
    <div className="m-4"> { dbCurrentQuestion === dayliQuize ?  
      <>
     <div className="flex justify-center items-center h-[90vh]"> <h2 className="text-center text-2xl">You Finised ToDay Task </h2> </div>
    </>
      :
      <>
         <div className="md:w-6/12 lg:w-6/12 w-10/12 mx-auto text-center mt-11">
          
          
        <div className="flex justify-center items-center text-2xl"> {currentQuestion}/{dayliQuize} Quize Left </div>

        <div className="flex justify-center items-center text-2xl">
                {" "}
                <span className="mr-2 text-success">
                  <MdOutlineAvTimer />
                </span>{" "}
                <span className="text-primary">{remainingTime}s Left</span>
              </div>

      <h2 className="text-xl text-center">{quizes[dbCurrentQuestion]?.title} </h2>
      <ul className="Option grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-2 mt-4">
        {quizes[dbCurrentQuestion]?.quizeOptions?.map((option, _id) => (
          <>
            
            
              <button
                className="option"
                key={_id}
                onClick={() => submitQuize(option)}
              >
                {" "}
                {option}{" "}
              </button>
            
          </>
        ))}
      </ul>
        </div>
      </>
      
     
    }
   
    </div>
  );
};

export default PlayQuize;
