import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";

const SingleUserHistory = () => {
  const userHistory = useLoaderData();

  const handlereset = (id) =>{
    try{
        fetch(`http://localhost:5000/reset-user-history?id=${id}`,{
           method:"PUT",
        })
        .then(res=> res.json())
        .then(data => {
            
        })
       
       }catch(err) {}
  }

  return (
    <div>
      <div>
        <h2 className="text-center text-2xl font-bold my-3">
          {" "}
          user All Time History{" "}
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Seriul</th>
                <th>Date</th>
                <th>Email</th>
                <th>category</th>
                <th>score</th>
                <th>rightAns</th>
                <th>wrongAns</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userHistory.length &&
                userHistory.map((user, index) => (
                  <tr key={user._id}>
                    <th> {index + 1} </th>
                    <th>{user.date}</th>
                    <th>{user.email}</th>
                    <th>{user.categoryName}</th>
                    <th>{user.score}</th>
                    <th>{user.rightAns}</th>
                    <th>{user.wrongAns}</th>
                    <th>
                      <button className="btn">Delete</button>
                    </th>
                    <th>
                      <button
                        onClick={() => handlereset(user._id)}
                        className="btn"
                      >
                        Reset
                      </button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleUserHistory;
