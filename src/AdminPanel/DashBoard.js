import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineUsergroupAdd, AiFillSetting } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

import "../cssFiles/DashDiv.css";
import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="m-4">
      <div className="flex items-center mb-5">
        {" "}
        <span className="text-5xl text-success mr-3">
          {" "}
          <MdAdminPanelSettings />{" "}
        </span>{" "}
        <h2 className="text-success text-2xl"> Admin Pannel </h2>{" "}
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 dashboard_content">
        <div className="divtwo p-3">
          <div className="flex justify-center">
            {" "}
            <span className="text-5xl text-white">
              {" "}
              <BiAddToQueue />{" "}
            </span>
          </div>
          <div className="text-center text-white">
            <h2 className="text-xl mb-3"> Insert Quize </h2>
            <Link className="px-5 py-1 rounded-sm" to="/dashboard/addQuize">
              {" "}
              Viste{" "}
            </Link>
          </div>
        </div>

        <div className="divone p-3">
          <div className="flex justify-center">
            <span className="text-5xl text-white flex">
              {" "}
              <AiOutlineUsergroupAdd />{" "}
            </span>
          </div>

          <div className="text-center text-white">
            <h2 className="text-xl mb-3"> User Info </h2>
            <Link className="px-5 py-1 rounded-sm" to="/dashboard/userinfo">
              {" "}
              Viste{" "}
            </Link>
          </div>
        </div>

        <div className="divthree p-3">
          <div className="flex justify-center">
            <span className="text-5xl text-white">
              {" "}
              <FaHistory />{" "}
            </span>
          </div>
          <div className="text-center text-white">
            <h2 className="text-xl mb-3"> User History </h2>
            <Link className="px-5 py-1 rounded-sm" to="/dashboard/userHistory">
              {" "}
              Viste{" "}
            </Link>
          </div>
        </div>

        <div className="divfour p-3">
          <div className="flex justify-center">
            <span className="text-5xl text-white">
              {" "}
              <AiFillSetting />{" "}
            </span>
          </div>
          <div className="text-center text-white">
            <h2 className="text-xl mb-3"> Settings </h2>
            <Link className="px-5 py-1 rounded-sm" to="/dashboard/settings">
              {" "}
              Viste{" "}
            </Link>
          </div>
        </div>

        {/* quizes */}

        <div className="divtwo p-3">
          <div className="flex justify-center">
            {" "}
            <span className="text-5xl text-white">
              {" "}
              <GiBrain />{" "}
            </span>
          </div>
          <div className="text-center text-white">
            <h2 className="text-xl mb-3"> all Quize </h2>
            <Link className="px-5 py-1 rounded-sm" to="/dashboard/allQuize">
              {" "}
              Viste{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
