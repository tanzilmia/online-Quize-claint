import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCategory, MdOutlineAvTimer, MdTask } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { AiOutlineMinus } from "react-icons/ai";
import { BsSkipEnd } from "react-icons/bs";
import "../cssFiles/Settings.css";
const QuizeSetting = () => {
  const [updateSetting, setupdateSetting] = useState(false);
  const [updatedayliQuize, setupdatedayliQuize] = useState(false);
  const [addCategoryState, setaddCategoryState] = useState(false);
  const [rightPoint, setrightPoint] = useState(false);
  const [wrongpoint, setWrongpoint] = useState(false);
  const [autosubmit, setautosubmitPoint] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: settings = {}, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await fetch(`https://online-quize-server.vercel.app/settings`);
      const data = await res.json();
      return data;
    },
  });
  const [{ dayliQuize, timer,icressPoint,decressPoint,autosubmitPoint }] = settings.data;
// time limit function
  const timelimit = (e) => {
    e.preventDefault();
    const newtime = e.target.timer.value;
    const time = parseInt(newtime);
    fetch(`https://online-quize-server.vercel.app/update-timer`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ time }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "update complete") {
          refetch();
          setupdateSetting(false);
        }
      });
  };
  // quize limite
  const updatequizlimite = (e) => {
    e.preventDefault();
    const newdailyquize = e.target.dailyquize.value;
    const UpdateDailyQuize = parseInt(newdailyquize);
    fetch(`https://online-quize-server.vercel.app/update-dailyQuze`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ UpdateDailyQuize }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "update complete") {
          refetch();
          setupdatedayliQuize(false);
        }
      });
  };

  // update right point
  const updaterightPoint = (e) => {
    e.preventDefault();
    const newrightPoint = e.target.rightPoint.value;
    const UpdaterightPoint = parseInt(newrightPoint);
    fetch(`https://online-quize-server.vercel.app/update-right-point`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ UpdaterightPoint }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "update complete") {
          refetch();
          setrightPoint(false);
        }
      });
  };

  // update wrong point
  const updatewrongPoint = (e) => {
    e.preventDefault();
    const newrwrongPoint = e.target.wrongPoint.value;
    const UpdatewrongPoint = parseInt(newrwrongPoint);
    fetch(`https://online-quize-server.vercel.app/update-wrong-point`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ UpdatewrongPoint }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "update complete") {
          refetch();
          setWrongpoint(false);
        }
      });
  };
  // update autosubmit point

  const updateautoPoint = (e) => {
    e.preventDefault();
    const newautosubmit = e.target.autosubmit.value;
    const Updateautosubmit = parseInt(newautosubmit);
    fetch(`https://online-quize-server.vercel.app/update-autosubmit-point`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ Updateautosubmit }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "update complete") {
          refetch();
          setautosubmitPoint(false);
        }
      });
  };
  const handleAddCategories = (data) => {
    const categories = data.addCategoreys;
    console.log(categories);

    const categoryData = {
      categoryName: categories,
    };

    try {
      fetch(`https://online-quize-server.vercel.app/addcategory`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(categoryData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === "exist") {
            alert("Quize is already exist");
          }
          if (data.message === "successfull") {
            alert("Quize add successfull");
            reset();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid md:grid-cols-3 m-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 text-center">
      {/* add quize categories */}
      <div className="common_div category_div">
        {addCategoryState === false ? (
          <>
            <div className="flex items-center text-white flex-col justify-center">
              <span className="text-5xl mb-3">
                {" "}
                <MdCategory />{" "}
              </span>
              <button
                onClick={() => setaddCategoryState(true)}
                className="btn btn-primary btn-sm"
              >
                {" "}
                add Category
              </button>
            </div>
          </>
        ) : (
          <>
            <h4 className="text-xl text-white">Add New Categories</h4>
            <form onSubmit={handleSubmit(handleAddCategories)} action="">
              <div className="my-3">
                <input
                  className="p-2 rounded-lg"
                  type="text"
                  {...register("addCategoreys", {
                    required: "Name is Required",
                  })}
                  placeholder="Enter Your Category Name"
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary mb-3">
                Add Categories
              </button>
            </form>
          </>
        )}
      </div>

      <div className="common_div update_time">
        {updateSetting === false ? (
          <>
            <div className="flex items-center text-white flex-col justify-center">
              <div className="flex justify-center items-center text-2xl">
                {" "}
                <span className="text-5xl mb-3">
                  <MdOutlineAvTimer />
                </span>{" "}
                {timer}{" "}
              </div>
              <button
                className="btn btn-sm btn-info"
                onClick={() => setupdateSetting(true)}
              >
                Quize time
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center text-white text-2xl">
              {" "}
              <span className="text-5xl mb-3">
                <MdOutlineAvTimer />
              </span>{" "}
              {timer}{" "}
            </div>
            <form onSubmit={timelimit}>
              <div className="my-3">
                <input
                  className="p-2 rounded-lg"
                  type="number"
                  defaultValue={timer}
                  name="timer"
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary">
                Add time
              </button>
            </form>
          </>
        )}
      </div>

      <div className="common_div update_quizeLimit">
        {updatedayliQuize === false ? (
          <>
            <div className="flex items-center text-white flex-col justify-center">
              <div className="flex justify-center items-center text-2xl">
                {" "}
                <span className="text-5xl mb-3">
                  <MdTask />
                </span>{" "}
                {dayliQuize}{" "}
              </div>
              <button
                className="btn btn-sm btn-success"
                onClick={() => setupdatedayliQuize(true)}
              >
                Quize limit
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex text-white justify-center items-center text-2xl">
              {" "}
              <span className="text-5xl mb-3">
                <MdTask />
              </span>{" "}
              {dayliQuize}{" "}
            </div>
            <form onSubmit={updatequizlimite}>
              <div className="my-3">
                <input
                  className="p-2 rounded-lg"
                  type="number"
                  defaultValue={dayliQuize}
                  name="dailyquize"
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary">
                update
              </button>
            </form>
          </>
        )}
      </div>
      {/* update right point */}

      <div className="common_div update_rightAns">
        {rightPoint === false ? (
          <>
            <div className="flex items-center text-white flex-col justify-center">
              <div className="flex justify-center items-center text-2xl">
                {" "}
                <span className="text-5xl mb-3">
                  <FaPlus />
                </span>{" "}
                {icressPoint}{" "}
              </div>
              <button
                className="btn btn-sm btn-success"
                onClick={() => setrightPoint(true)}
              >
                 Right Point
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex text-white justify-center items-center text-2xl">
              {" "}
              <span className="text-5xl mb-3">
                <MdTask />
              </span>{" "}
              {icressPoint}{" "}
            </div>
            <form onSubmit={updaterightPoint}>
              <div className="my-3">
                <input
                  className="p-2 rounded-lg"
                  type="number"
                  defaultValue={icressPoint}
                  name="rightPoint"
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary">
                update
              </button>
            </form>
          </>
        )}
      </div>

      {/* update wrong point */}
      <div className="common_div update_quizeLimit">
        {wrongpoint === false ? (
          <>
            <div className="flex items-center text-white flex-col justify-center">
              <div className="flex justify-center items-center text-2xl">
                {" "}
                <span className="text-5xl mb-3">
                  <AiOutlineMinus />
                </span>{" "}
                {decressPoint}{" "}
              </div>
              <button
                className="btn btn-sm btn-success"
                onClick={() => setWrongpoint(true)}
              >
                 wrong Point
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex text-white justify-center items-center text-2xl">
              {" "}
              <span className="text-5xl mb-3">
                <MdTask />
              </span>{" "}
              {decressPoint}{" "}
            </div>
            <form onSubmit={updatewrongPoint}>
              <div className="my-3">
                <input
                  className="p-2 rounded-lg"
                  type="number"
                  defaultValue={decressPoint}
                  name="wrongPoint"
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary">
                update
              </button>
            </form>
          </>
        )}
      </div>

      {/* update autosubmit point */}
      <div className="common_div category_div">
        {autosubmit === false ? (
          <>
            <div className="flex items-center text-white flex-col justify-center">
              <div className="flex justify-center items-center text-2xl">
                {" "}
                <span className="text-5xl mb-3">
                  <BsSkipEnd />
                </span>{" "}
                {autosubmitPoint}{" "}
              </div>
              <button
                className="btn btn-sm btn-success"
                onClick={() => setautosubmitPoint(true)}
              >
                 Auto Point
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex text-white justify-center items-center text-2xl">
              {" "}
              <span className="text-5xl mb-3">
                <MdTask />
              </span>{" "}
              {autosubmitPoint}{" "}
            </div>
            <form onSubmit={updateautoPoint}>
              <div className="my-3">
                <input
                  className="p-2 rounded-lg"
                  type="number"
                  defaultValue={autosubmitPoint}
                  name="autosubmit"
                />
              </div>
              <button type="submit" className="btn btn-sm btn-primary">
                update
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizeSetting;
