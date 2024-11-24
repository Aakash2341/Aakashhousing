import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../component/Oauth";
const SignUp = () => {
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      /*if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }*/

      const data = await response.json();
      if (data.success === false) {
        seterror(data.message);
        console.log(data);
        return;
      }
      seterror(null);
      navigate("/sign-in");
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign UP</h1>
      <form onSubmit={handlesubmit} className=" flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handlechange}
        />
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
        <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80">
          {" "}
          sign up
        </button>
        <Oauth></Oauth>
      </form>
      {error && <p className=" text-red-500 mt-4">{error}</p>}
      <div className=" flex gap-3 mt-4">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
