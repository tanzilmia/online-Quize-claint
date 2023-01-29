import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { mycontext } from "../contextApi/Authcontext";

const EditeQuize = () => {
  const { categoryObject } = useContext(mycontext);
  const { categoryOptions } = categoryObject;
  const [isDesabled, setisDesabled] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const quizeinfo = useLoaderData();
  const { title, correctAnswer, categoryName, _id } = quizeinfo;
  const { quizeOptions } = quizeinfo;
  const naviget = useNavigate();

  const handleAddQuize = (data) => {
    const title = data.title;
    const optionOne = data.optionOne;
    const optionTow = data.optionTow;
    const optionThree = data.optionThree;
    const optionFour = data.optionFour;
    const quizeOptions = [optionOne, optionTow, optionThree, optionFour];
    const categoryName = data.categoryName;
    const correctAnswer = data.correctAnswer;

    const updateData = {
      title,
      quizeOptions,
      categoryName,
      correctAnswer,
      id: _id,
    };

    fetch(`https://online-quize-server.vercel.app/single-Quize-update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "update complete") {
          naviget(`/dashboard/allQuize/${categoryName}`);
        }
      });
  };

  return (
    <div className="m4">
      <h2>Edite QUize </h2>
      <div className="sm:w-full lg:w-8/12 md:w-8/12 mx-auto p-5 form">
        <h2 className="text-center md:text-3xl lg:text-3xl sm:text-2xl mb-4 font-bold">
          {" "}
          Update Quize{" "}
        </h2>
        <form onSubmit={handleSubmit(handleAddQuize)} className="form_inside">
          <div className="title">
            <input
              type="text"
              defaultValue={title}
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
                defaultValue={quizeOptions[0]}
                {...register("optionOne", {
                  required: "Name is Required",
                })}
                placeholder="option 1"
              />
            </div>
            <div className="single_option">
              <input
                type="text"
                defaultValue={quizeOptions[1]}
                {...register("optionTow", {
                  required: "Name is Required",
                })}
                placeholder="option 2"
              />
            </div>
            <div className="single_option">
              <input
                type="text"
                defaultValue={quizeOptions[2]}
                {...register("optionThree", {
                  required: "Name is Required",
                })}
                placeholder="option 3"
              />
            </div>
            <div className="single_option">
              <input
                type="text"
                defaultValue={quizeOptions[3]}
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
                defaultValue={correctAnswer}
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
                defaultValue={categoryName}
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
            <button type="submit"> Update Quize</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditeQuize;
