import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
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
      const res = await fetch(`http://localhost:5000/storeuser?email=${email}`);
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
    fetch(`http://localhost:5000/userifno?email=${user?.email}&date=${date}`,{
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

    fetch(`http://localhost:5000/quize?email=${user?.email}&date=${date}`)
      .then((res) => res.json())
      .then((data) => setqueges(data));
  };

  const answer = queges[currentQuestion]?.correct_answer;
  const getAnswer = (option) => {
    if (option === answer) {
      setscore(score + 1);
      fetch(
        `http://localhost:5000/correctans?email=${user?.email}&date=${date}`,
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
        `http://localhost:5000/incurrentquestion?email=${user?.email}&date=${date}`,
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
      `http://localhost:5000/currentquestion?email=${user?.email}&date=${date}`,
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
    fetch(`http://localhost:5000/userinfo?email=${user?.email}&date=${date}`)
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
          Get Today Quize
        </button>{" "}
      </div>

      {userdata?.currentQuestion >= 50 ? (
        <>
          <h2> Task Complete ! Relode Next Day For New Quize </h2>
          <div>
            {" "}
            <span> correct ans : {userdata?.score} </span>{" "}
            <span> wrong ans : {userdata?.wrongAns} </span>{" "}
          </div>
        </>
      ) : (
        <>
          {queges.length ? (
            <>
              <h2 className="quizesubmite">
                Quize {currentQuestion} / {queges.length}
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
