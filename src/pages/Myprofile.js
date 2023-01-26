import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { mycontext } from "../contextApi/Authcontext";

const Myprofile = () => {
  const { user } = useContext(mycontext);

  const { data: userinfo = [] } = useQuery({
    queryKey: ["user-info", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/user-info?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  console.log(userinfo);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold">
        {" "}
        Hello {user?.name} , it's your Quize Playing Histry
      </h2>

     {
        userinfo.length > 0 ?
        <>
        <table className="table w-full">
        <thead>
          <tr>
            <th>Seriul</th>
            <th>Date</th>
            <th>category</th>
            <th>score</th>
            <th>rightAns</th>
            <th>wrongAns</th>
          </tr>
        </thead>
        <tbody>
          {userinfo.length &&
            userinfo.map((user, index) => (
              <tr key={user._id}>
                <th> {index + 1} </th>
                <th>{user.date}</th>
                <th>{user.categoryName}</th>
                <th>{user.score}</th>
                <th>{user.rightAns}</th>
                <th>{user.wrongAns}</th>
              </tr>
            ))}
        </tbody>
      </table>
        </>
        :
        <>
        <div className="text-center">
        <h2 className="text-xl font-bold"> Currently You Don't Play Quize </h2>
        <Link to = '/quize'> Visite Quize </Link>
        </div>
        </>
     }
      
    </div>
  );
};

export default Myprofile;
