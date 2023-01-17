import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUpError, setSignUPError] = useState("");
  const neviget = useNavigate();

  const handleSignup = (data) => {
    setSignUPError("");
    const name = data.name;
    const email = data.email;
    const password = data.password;
    fetch(`http://localhost:5000/register`,{
      method: 'POST',
      headers: {
        "content-type" : "application/json"
      },
      body : JSON.stringify({name, email, password})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      
    })





    //  update users
        
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                }
  
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <input
            className="btn btn-accent w-full mt-4"
            value="Register"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
