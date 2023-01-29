import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { mycontext } from "../contextApi/Authcontext";
import "../cssFiles/AddQuize.css";
const AddQuize = () => {
  const { categoryObject } = useContext(mycontext);
  const [quizeError, setquizeError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { categoryOptions } = categoryObject;

  const handleAddQuize = (data) => {
    setquizeError("");
    const title = data.title;
    const optionOne = data.optionOne;
    const optionTow = data.optionTow;
    const optionThree = data.optionThree;
    const optionFour = data.optionFour;
    const categoryName = data.categoryName;
    const correctAnswer = data.correctAnswer;

    const quizeData = {
      title,
      quizeOptions: [optionOne, optionTow, optionThree, optionFour],
      correctAnswer,
      categoryName,
    };

    // post quize

    try {
      fetch(`https://online-quize-server.vercel.app/insertquize`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(quizeData),
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
    <div className="m-4">
      <div className="sm:w-full lg:w-8/12 md:w-8/12 mx-auto p-5 form">
        <h2 className="text-center md:text-3xl lg:text-3xl sm:text-2xl mb-4 font-bold">
          Add New Quize With Category{" "}
        </h2>
        <form onSubmit={handleSubmit(handleAddQuize)} className="form_inside">
          <div className="title">
            <input
              type="text"
              {...register("title", {
                required: "Name is Required",
              })}
              placeholder="Quize Title"
            />
          </div>
          <div className="insert_Options grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2 ">
            <div className="single_option">
              <input
                type="text"
                {...register("optionOne", {
                  required: "Name is Required",
                })}
                placeholder="option 1"
              />
            </div>
            <div className="single_option">
              <input
                type="text"
                {...register("optionTow", {
                  required: "Name is Required",
                })}
                placeholder="option 2"
              />
            </div>
            <div className="single_option">
              <input
                type="text"
                {...register("optionThree", {
                  required: "Name is Required",
                })}
                placeholder="option 3"
              />
            </div>
            <div className="single_option">
              <input
                type="text"
                {...register("optionFour", {
                  required: "Name is Required",
                })}
                placeholder="option 4"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-2 mt-5">
            <div className="single_option">
              <input
                type="text"
                {...register("correctAnswer", {
                  required: "Name is Required",
                })}
                placeholder="Enter Correct Anser"
              />
            </div>

            <div className="select_categorys">
              <select
                placeholder="chose category"
                name="select categorys"
                {...register("categoryName", {
                  required: "Name is Required",
                })}
                id=""
              >
                {categoryOptions.length &&
                  categoryOptions?.map((options) => (
                    <option value={options.categoryName}>
                      {options.categoryName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="quize_btn">
            <button type="submit">Click To Insert</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuize;
