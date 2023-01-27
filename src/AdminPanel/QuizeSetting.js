import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import '../cssFiles/Settings.css'
const QuizeSetting = () => {
  const [updateSetting, setupdateSetting] = useState(false);
  const [updatedayliQuize, setupdatedayliQuize] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [quizeError, setquizeError] = useState("");

  const { data: settings = {}, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/settings`);
      const data = await res.json();
      return data;
    },
  });
  const [{ dayliQuize, timer }] = settings.data;

  const timelimit = (e) => {
    e.preventDefault();
    const newtime = e.target.timer.value;
    const time = parseInt(newtime);
    fetch(`http://localhost:5000/update-timer`, {
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
  const updatequizlimite = (e) => {
    e.preventDefault();
    const newdailyquize = e.target.dailyquize.value;
    const UpdateDailyQuize = parseInt(newdailyquize);
    fetch(`http://localhost:5000/update-dailyQuze`, {
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

  const handleAddCategories = (data) => {
    const categories = data.addCategoreys;
    console.log(categories);

    const categoryData = {
      categoryName: categories,
    };

    try {
      fetch(`http://localhost:5000/addcategory`, {
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
    <div>
      {/* add quize categories */}
      <div>
        <h2>Add New Categories</h2>
        <form onSubmit={handleSubmit(handleAddCategories)} action="">
          <div>
            <input
              type="text"
              {...register("addCategoreys", {
                required: "Name is Required",
              })}
              placeholder="Enter Your Category Name"
            />
          </div>
          <button type="submit">Add Categories</button>
        </form>
      </div>

      <div>
        {updateSetting === false ? (
          <>
            <h2>Cureenty time is {timer} </h2>
            <button onClick={() => setupdateSetting(true)}>ChangeTime</button>
          </>
        ) : (
          <>
            <h2>Time Limit {timer} seconds </h2>
            <form onSubmit={timelimit}>
              <div>
                <input type="number" defaultValue={timer} name="timer" />
              </div>
              <button type="submit">Add time</button>
            </form>
          </>
        )}
      </div>

      <div>
        {updatedayliQuize === false ? (
          <>
            <h2>Daily {dayliQuize} Qize Limited</h2>
            <button onClick={() => setupdatedayliQuize(true)}>update</button>
          </>
        ) : (
          <>
            <h2>Quize Limit {dayliQuize} </h2>
            <form onSubmit={updatequizlimite}>
              <div>
                <input
                  type="number"
                  defaultValue={dayliQuize}
                  name="dailyquize"
                />
              </div>
              <button type="submit">update</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizeSetting;
