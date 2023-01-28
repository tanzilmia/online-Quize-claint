import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { ImPower } from "react-icons/im";
import {
  MdDangerous,
  MdAutorenew,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { SiInfiniti } from "react-icons/si";

const SingleUserHistory = () => {
  const userHistory = useLoaderData();

  const coppyUserinfo = [...userHistory];

  let dateCounts = coppyUserinfo.reduce((counts, item) => {
    if (!counts[item.date]) {
      counts[item.date] = { date: item.date, count: 1 };
    } else {
      counts[item.date].count++;
    }
    return counts;
  }, {});

  let uniqueDates = Object.keys(dateCounts);
  const totalDay = uniqueDates.length;

  let totalscore = 0;
  if (coppyUserinfo.length > 0) {
    coppyUserinfo.forEach((element) => {
      totalscore += element.score;
    });
  }

  let totalwrong = 0;
  if (coppyUserinfo.length > 0) {
    coppyUserinfo.forEach((element) => {
      totalwrong += element.wrongAns;
    });
  }
  let totalRight = 0;
  if (coppyUserinfo.length > 0) {
    coppyUserinfo.forEach((element) => {
      totalRight += element.rightAns;
    });
  }

  let totalQuize = 0;
  if (coppyUserinfo.length > 0) {
    coppyUserinfo.forEach((element) => {
      totalQuize += element.currentQuestion;
    });
  }

  let autoSubmitQuize = 0;
  if (coppyUserinfo.length > 0) {
    coppyUserinfo.forEach((element) => {
      autoSubmitQuize += element.autoSubmitAnswer;
    });
  }

  const handlereset = (id) => {
    try {
      fetch(`http://localhost:5000/reset-user-history?id=${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {});
    } catch (err) {}
  };

  return (
    <div>
      <div>
        <div className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 my-5 gap-4 text-center">
          <div className="common_div category_div">
            <div className="flex items-center text-white flex-col justify-center">
              <span className="text-4xl">
                {" "}
                <ImPower />{" "}
              </span>
              <span className="text-xl"> total {totalscore} point </span>
            </div>
          </div>

          <div className="common_div update_time">
            <div className="flex items-center text-white flex-col justify-center">
              <span className="text-4xl">
                {" "}
                <GoVerified />{" "}
              </span>
              <span className="text-xl"> total {totalRight} correct </span>
            </div>
          </div>

          <div className="common_div update_rightAns">
            <div className="flex items-center text-white flex-col justify-center">
              <span className="text-4xl">
                {" "}
                <MdDangerous />{" "}
              </span>
              <span className="text-xl"> total {totalwrong} incorrect </span>
            </div>
          </div>

          <div className="common_div update_quizeLimit">
            <div className="flex items-center text-white flex-col justify-center">
              <span className="text-4xl">
                {" "}
                <MdAutorenew />{" "}
              </span>
              <span className="text-xl">
                Total {autoSubmitQuize} auto submit{" "}
              </span>
            </div>
          </div>

          <div className="common_div update_time">
            <div className="flex items-center text-white flex-col justify-center">
              <span className="text-4xl">
                {" "}
                <SiInfiniti />{" "}
              </span>
              <span className="text-xl"> Total {totalQuize} Answer </span>
            </div>
          </div>

          <div className="common_div update_rightAns">
            <div className="flex items-center text-white flex-col justify-center">
              <span className="text-4xl">
                {" "}
                <MdOutlineCalendarToday />{" "}
              </span>
              <span className="text-xl"> Total {totalDay} Day Played </span>
            </div>
          </div>
        </div>

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
                      <button className="btn btn-sm">Delete</button>
                    </th>
                    <th>
                      <button
                        onClick={() => handlereset(user._id)}
                        className="btn btn-sm"
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
