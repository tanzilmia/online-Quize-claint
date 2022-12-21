import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mycontext } from "../contextApi/Authcontext";
import "../styles/style.css";
function Quize() {
  const [queges, setqueges] = useState([]);
  const { user, loading } = useContext(mycontext);
  const date = moment().format("MMM Do YY");
  const [userdata, setuserdata] = useState({});
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [score, setscore] = useState(0);
  const [wrongAns, setwrongAns] = useState(0);
  const email = user?.email;
  const name = user?.displayName;
  console.log(date);

  const { data: registeruser = {}, refetch } = useQuery({
    queryKey: ["storeuser", email],
    queryFn: async () => {
      const res = await fetch(`https://server-tanzilmia.vercel.app/storeuser?email=${email}`);
      const data = await res.json();
      return data;
    },
  });

  console.log(registeruser);

  refetch();

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
    fetch(`https://server-tanzilmia.vercel.app/userifno?email=${user?.email}&date=${date}`,{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userinfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    fetch(`https://server-tanzilmia.vercel.app/quize?email=${user?.email}&date=${date}`)
      .then((res) => res.json())
      .then((data) => setqueges(data));
  };

  const answer = queges[currentQuestion]?.correct_answer;
  const getAnswer = (option) => {
    if (option === answer) {
      setscore(score + 1);
      fetch(
        `https://server-tanzilmia.vercel.app/correctans?email=${user?.email}&date=${date}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({score}),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    }
    if (option !== answer) {
      setwrongAns(wrongAns + 1);
      fetch(
        `https://server-tanzilmia.vercel.app/incurrentquestion?email=${user?.email}&date=${date}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ wrongAns }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          // update total wrong answer
         
        });
      console.log(`wrong answer ${option}`);
    }
    fetch(
      `https://server-tanzilmia.vercel.app/currentquestion?email=${user?.email}&date=${date}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ currentQuestion }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
    setcurrentQuestion(currentQuestion + 1);
  };
  useEffect(() => {
    fetch(`https://server-tanzilmia.vercel.app/userinfo?email=${user?.email}&date=${date}`)
      .then((res) => res.json())
      .then((data) => setuserdata(data));
  }, [user?.email, date, currentQuestion]);

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
          {`${userdata?.currentQuestion >= 50  ? 'Task Complete' : 'Get Today Quize'}`}
          
          
        </button>{" "}
      </div>

      {userdata?.currentQuestion >= 50 ? (
        <>
          
          <div className="text-center mt-[150px]">
            {" "}
            <h3><span>Today Quize is Finished , You Can't Answer More Today <br /> But Tomorrow You Can ..</span></h3>
            <h1 className="text-2xl"> correct ans : {userdata?.score} wrong ans : {userdata?.wrongAns} </h1>{" "}
    
            <Link className="btn btn-primary my-5" to = '/profile'>Click To Visite Profile</Link>
          </div>
        </>
      ) : (
        <>
          {queges.length ? (
            <>
              <h2 className="quizesubmite">
                Quize {currentQuestion} / 50
              </h2>
            </>
          ) : (
            <>
              <h2 className="quizesubmite"> No Data </h2>
            </>
          )}
          <div>
            <h2 className="question">{queges[currentQuestion]?.question}</h2>
            <ul>
              {queges[currentQuestion]?.options?.map((option, _id) => (
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
