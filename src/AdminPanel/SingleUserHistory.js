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
      fetch(`https://online-quize-server.vercel.app/reset-user-history?id=${id}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {});
    } catch (err) {}
  };

  return (
    <div className="m-4">
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

        <div className="flex justify-center">
          <table className="table-auto w-full text-center text-sm">
            <thead class="bg-gray-200">
              <tr className="sticky top-0 bg-gray-200">
                <th className="px-4 py-2">Serial</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Right Answers</th>
                <th className="px-4 py-2">Wrong Answers</th>
                <th className="px-4 py-2">Total Answer</th>
                <th className="px-4 py-2">AutoSubmit</th>
              </tr>
            </thead>
            <tbody>
              {userHistory.length &&
                userHistory.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{user.date}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.categoryName}</td>
                    <td className="border px-4 py-2">{user.score}</td>
                    <td className="border px-4 py-2">{user.rightAns}</td>
                    <td className="border px-4 py-2">{user.wrongAns}</td>
                    <td className="border px-4 py-2">{user.currentQuestion}</td>
                    <td className="border px-4 py-2">
                      {user.autoSubmitAnswer}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* <div className="overflow-x-auto">
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
        </div> */}
      </div>
    </div>
  );
};

export default SingleUserHistory;
