import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from 'react-hot-toast';

function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit =async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/user/register", user,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  
  };

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  return (
    <div className="min-w-96 mx-auto ">
      <div className="w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="font-bold text-center text-3xl">Sign Up</h1>
        <form onSubmit={handleFormSubmit} action="" method="">
          <div>
            <label className="label p-2">
              <span className="text-base">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => {
                setUser({ ...user, fullName: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Fullname"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base">Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
              }}
              className="w-full input input-bordered h-10"
              type="password"
              name=""
              id="confirmpassword"
              placeholder="Confirm Password"
            />
          </div>

          <div className="flex ">
            <div className="flex items-center my-2">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox mx-2"
              />
            </div>

            <div className="flex items-center my-2">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox mx-2"
              />
            </div>
          </div>

          <Link to="/login" className="underline text-center">
            Already have an account? click to sign in
          </Link>

          <div>
            <button type="submit" className="btn btn-block btn-neutral my-2">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
