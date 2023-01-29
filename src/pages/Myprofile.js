import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { mycontext } from "../contextApi/Authcontext";
import { ImPower } from "react-icons/im";
import {
  MdDangerous,
  MdAutorenew,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { SiInfiniti } from "react-icons/si";

import "../cssFiles/Settings.css";

const Myprofile = () => {
  const { user } = useContext(mycontext);

  const { data: userinfo = [] } = useQuery({
    queryKey: ["user-info", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://online-quize-server.vercel.app/user-info?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const coppyUserinfo = [...userinfo];

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

  return (
    <div className="m-4">
      {/* user demo history */}

      <h2 className="text-center text-2xl font-bold">
        {" "}
        Hello {user?.name} , it's your Quize Playing Histry
      </h2>

      {userinfo.length > 0 ? (
        <>
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

          {/* <table className="table w-full">
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
          </table> */}

          <div className="flex justify-center">
            <table className="table-auto w-full text-center">
              <thead class="bg-gray-200">
                <tr className="sticky top-0 bg-gray-200">
                  <th className="px-4 py-2">Serial</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Right Answers</th>
                  <th className="px-4 py-2">Wrong Answers</th>
                  <th className="px-4 py-2">Total Answer</th>
                  <th className="px-4 py-2">AutoSubmit</th>
                </tr>
              </thead>
              <tbody>
                {userinfo.length &&
                  userinfo.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{user.date}</td>
                      <td className="border px-4 py-2">{user.categoryName}</td>
                      <td className="border px-4 py-2">{user.score}</td>
                      <td className="border px-4 py-2">{user.rightAns}</td>
                      <td className="border px-4 py-2">{user.wrongAns}</td>
                      <td className="border px-4 py-2">
                        {user.currentQuestion}
                      </td>
                      <td className="border px-4 py-2">
                        {user.autoSubmitAnswer}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
            <h2 className="text-xl font-bold">
              {" "}
              Currently You Don't Play Quize{" "}
            </h2>
            <Link to="/quize"> Visite Quize </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Myprofile;
