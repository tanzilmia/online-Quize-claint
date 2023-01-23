import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import '../cssFiles/PlayQuize.css'
const PlayQuize = () => {
  const [currentQuize, setcurrentQuize] = useState(0);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [stop, setStop] = useState(false);
  const time = 10
  const [remainingTime, setRemainingTime] = useState(15);
  const quizeData = useLoaderData();

  console.log(quizeData);
  const quizes = quizeData?.data;
  const answer = quizes[currentQuestion]?.correctAnswer;

  useEffect(() => {
    if(currentQuestion <= 2){
      const interval = setInterval(() => {
        if (remainingTime === 0) {
            // call function to stop quiz
            setRemainingTime(15)
            setcurrentQuestion(currentQuestion + 1);
             
            return;
          }
          setRemainingTime(remainingTime - 1);
          
    }, 1000);
    
    return () => clearInterval(interval);
    }
  }, [remainingTime,currentQuestion]);

  // quize answer gettting
  const submitQuize = (option) => {
    if (option === answer) {
      alert("right answer");
      setcurrentQuestion(currentQuestion + 1);
      setRemainingTime(15)
    }
    if (option !== answer) {
      alert("wrong answer");
      setcurrentQuestion(currentQuestion + 1);
      setRemainingTime(15)
    }
  };

  return (
    <div className="w-6/12 mx-auto text-center mt-11">
      <div>Remaining Time: {remainingTime} seconds</div>
      <h2 className="text-xl text-center">{quizes[currentQuestion]?.title} </h2>
      <ul className="Option grid grid-cols-2 gap-2 mt-4">
        {quizes[currentQuestion]?.quizeOptions?.map((option, _id) => (
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
  );
};

export default PlayQuize;
