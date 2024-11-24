import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, singInSuccess } from "../redux/user/userSlice";
import Oauth from "../component/Oauth";
const Signin = () => {
  const [formdata, setformdata] = useState({});
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formdata);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
        credentials: "include",
      });

      /*if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }*/

      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        console.log(data);
        return;
      }
      dispatch(singInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign IN</h1>
      <form onSubmit={handlesubmit} className=" flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handlechange}
        />{" "}
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handlechange}
        />
        <button className="bg-slate-800 text-white p-3 uppercase rounded-lg hover:opacity-85 disabled:opacity-80">
          {" "}
          sign IN
        </button>
        <Oauth></Oauth>
      </form>
      {error && <p className=" text-red-500 mt-4">{error}</p>}
      <div className=" flex gap-2 mt-4">
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className=" text-blue-700">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
