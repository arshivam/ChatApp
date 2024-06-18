import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { setAuthUser } from "../redux/userSlice";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      dispatch(setAuthUser(res?.data))
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto ">
      <div className="w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="font-bold text-center text-3xl">Login in</h1>
        <form onSubmit={handleFormSubmit} action="" method="">
          <div>
            <label className="label p-2">
              <span className="text-base">Username</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base">Password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>

          <Link to="/signup" className="underline text-center my-4">
            Don't have an account? please sign up..
          </Link>

          <div>
            <button type="submit" className="btn btn-block btn-neutral my-2">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
