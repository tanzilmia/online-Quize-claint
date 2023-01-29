import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { mycontext } from "../contextApi/Authcontext";

const Home = () => {
  const { user } = useContext(mycontext);
  return (
    <div className="text-center">
      <div
        className="bg-cover text-white"
        style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2017/07/10/23/45/cubes-2492010_960_720.jpg)`,
          height: "100vh",
        }}
      >
        {user?.name &&  (
          <div className="h-[90vh] flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold"> Hi <span className="text-red-500">{user.name}</span> , WellCome Back Quize Buzz . </h2>
            <p className="text-xl my-2 text-blue-500 font-bold"> To imporve your skills Play quize Game Now </p>
            <Link className="btn btn-info text-xl text-white font-bold rounded-3xl my-4" to = '/quize'>Explore Now </Link>
          </div>
        )}
        {user?.name ||  (
          <div className="h-[90vh] flex flex-col justify-center items-center">
            <h2 className="text-5xl font-bold"> Hi There , Wellcome to Quize Buzz </h2>
            <p className="text-xl my-2 text-blue-500 font-bold"> To imporve your skills Play quize Game Now </p>
            <Link className="btn btn-info text-xl text-white font-bold rounded-3xl my-4" to = '/login'>Login Now</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
