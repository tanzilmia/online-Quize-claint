import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { mycontext } from "../contextApi/Authcontext";

const Profile = () => {
  const { user } = useContext(mycontext);

  const { data: lifetimeinfo = [], refetch } = useQuery({
    queryKey: ["storeuser", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/totalinfo?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  let totalscore = 0;
  if (lifetimeinfo.length > 0) {
    lifetimeinfo.forEach((element) => {
      totalscore += element.score;
    });
  }

  let totalwrong = 0;
  if (lifetimeinfo.length > 0) {
    lifetimeinfo.forEach((element) => {
      totalwrong += element.wrongAns;
    });
  }

  let totalQuize = 0;
  if (lifetimeinfo.length > 0) {
    lifetimeinfo.forEach((element) => {
      totalQuize += element.currentQuestion;
    });
  }

  refetch();
  return (
    <div>
     {
      lifetimeinfo.length > 0 && 
      <>
       <div>
      <h2> Total day : {lifetimeinfo.length}</h2>
      <h2> Total right Answer {totalscore} </h2>
      <h2> Total wrong {totalwrong} </h2>
      <h2> Total quize {totalQuize} </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Date</th>
              <th>userName</th>
              <th>Correct Ans</th>
              <th>Wrong Ans</th>
              <th>TotalQuize</th>
            </tr>
          </thead>
          <tbody>
            {lifetimeinfo.map((userinfo, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{userinfo.date}</th>
                <th>{userinfo.name}</th>
                <th>{userinfo.score}</th>
                <th>{userinfo.wrongAns}</th>
                <th> {userinfo.currentQuestion}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
     }
    </div>
  );
};

export default Profile;
