
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { mycontext } from "../contextApi/Authcontext";
import "../styles/style.css";
function Quize() {
  const [queges, setqueges] = useState([]);
  const { user, loading } = useContext(mycontext);
  const date = moment().format("MMM Do YY");
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [score, setscore] = useState(0);
  const [wrongAns, setwrongAns] = useState(0);
  const email = user?.email;
  const name = user?.displayName;
// get storeuser info
  const {data:userdata = {}, refetch} = useQuery({
    queryKey : ['userinfo'],
    queryFn : async ()=>{
      const res = await fetch(`https://server-five-gold.vercel.app/userinfo?email=${user?.email}&date=${date}`)
      const data = await res.json()
      return data
    }
  })

  // dstructure all stored data

  const {currentQuestion:totalanswer, score:correct, wrongAns:wrong} = userdata
  let indexs = userdata?.currentQuestion > 0 ? userdata?.currentQuestion : 0 

  console.log(date);
  console.log(userdata);
  const loadDataFormDb = () => {
    const userinfo = {
      date,
      email,
      name,
      currentQuestion,
      score,
      wrongAns,
    };
    if (date !== userdata?.date) {
      fetch(
        `https://server-five-gold.vercel.app/userifno?email=${user?.email}&date=${date}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userinfo),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    }
    fetch(`https://server-five-gold.vercel.app/quize?email=${user?.email}&date=${date}`)
      .then((res) => res.json())
      .then((data) => setqueges(data));
  };

  const answer = queges[currentQuestion]?.correct_answer;
  const getAnswer = (option) => {
    if (option === answer) {
      setscore(score + 1);
      fetch(
        `https://server-five-gold.vercel.app/correctans?email=${user?.email}&date=${date}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({correct}),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          refetch()
        });
    }
    if (option !== answer) {
      setwrongAns(wrongAns + 1);
      fetch(
        `https://server-five-gold.vercel.app/incurrentquestion?email=${user?.email}&date=${date}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ wrong }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          // update total wrong answer
          refetch()
        });
      console.log(`wrong answer ${option}`);
    }
    fetch(
      `https://server-five-gold.vercel.app/currentquestion?email=${user?.email}&date=${date}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({totalanswer}),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        refetch()
      });
    setcurrentQuestion(currentQuestion + 1);
  };


  if (loading) {
    return <p>Lorem ...</p>;
  }

  return (
    <div className="main_div">
      <div>
        {" "}
        <button
          className="loadQuizee"
          onClick={loadDataFormDb}
          disabled={userdata?.currentQuestion >= 50}
        >
          {`${
            userdata?.currentQuestion >= 50 ? "Task Complete" : "Get Today Quize"
          }`}
        </button>{" "}
         
         
      </div>

      {userdata?.currentQuestion >= 50 ? (
        <>
          <div className="text-center mt-[150px]">
            {" "}
            <h2 className="text-2xl">{date}</h2>
            <h3>
              <span>
                Today Quize is Finished , You Can't Answer More Today <br /> But
                Tomorrow You Can ..
              </span>
            </h3>
            <h1 className="text-2xl">
              {" "}
              correct ans : {userdata?.score} wrong ans : {userdata?.wrongAns}{" "}
            </h1>{" "}
            <Link className="btn btn-primary my-5" to="/profile">
              Click To Visite Profile
            </Link>
          </div>
        </>
      ) : (
        <>
          {queges.length ? (
            <>
              <h2 className="quizesubmite">Quize {userdata?.currentQuestion} / 50 Quize Left</h2>
            </>
          ) : (
            <>
              <h2 className="quizesubmite"> EveryDay You Can Sumbmit 50 Quize Answer  </h2>
              <h2 className="quizesubmite"> {`You Submit ${userdata?.currentQuestion > 0 ? userdata?.currentQuestion : 0 } Answer `} </h2>
            </>
          )}
          <div>
            <h2 className="question">{queges[indexs]?.question}</h2>
            <ul>
              {queges[indexs]?.options?.map((option, _id) => (
                <>
                  <br />
                  <li>
                    <button
                      className="option"
                      key={_id}
                      onClick={() => getAnswer(option)}
                    >
                      {" "}
                      {option}{" "}
                    </button>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Quize;
