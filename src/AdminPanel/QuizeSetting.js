import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCategory,MdOutlineAvTimer,MdTask } from 'react-icons/md';
import '../cssFiles/Settings.css'
const QuizeSetting = () => {
  const [updateSetting, setupdateSetting] = useState(false);
  const [updatedayliQuize, setupdatedayliQuize] = useState(false);
  const [addCategoryState, setaddCategoryState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    <div className="grid grid-cols-3 gap-4 text-center">
      {/* add quize categories */}
      <div className="common_div category_div">
       {  addCategoryState === false ?
       <>
        <div className="flex items-center text-white flex-col justify-center">
          <span className="text-5xl mb-3"> <MdCategory/> </span>
          <button onClick={()=>setaddCategoryState(true)} className="btn btn-primary btn-sm"> add Category</button>
        </div>
       </>
       :
        <>
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
        </>
  
       }
      </div>

      <div className="common_div update_time">
        {updateSetting === false ? (
          <>
          <div className="flex items-center text-white flex-col justify-center">
            <div className="flex justify-center items-center text-2xl"> <span className="text-5xl mb-3"><MdOutlineAvTimer/></span> {timer}  </div>
            <button className="btn btn-sm btn-info" onClick={() => setupdateSetting(true)}>Update time</button>
          </div>
            
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

      <div className="common_div update_quizeLimit">
        {updatedayliQuize === false ? (
          <>
          <div className="flex items-center text-white flex-col justify-center">
          <div className="flex justify-center items-center text-2xl"> <span className="text-5xl mb-3"><MdTask/></span> {dayliQuize}  </div>
            <button className="btn btn-sm btn-success" onClick={() => setupdatedayliQuize(true)}>update Quize limit</button>
          </div>
            
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
