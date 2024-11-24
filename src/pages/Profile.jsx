import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUserfail,
  updateUsersuccess,
  deleteUserfail,
  deleteUsersuccess,
  signoutUsersuccess,
  signoutUserfail,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import Listing from "./Listing";
const Profile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [formdata, setformdata] = useState({});
  const [updatestatus, setupdatestatus] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [showlisterror, setshowlisterror] = useState(false);
  const [userlist, setuserlist] = useState([]);

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handledelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include", // Include credentials if needed
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserfail(data.message));
        return;
      }

      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      // Clear localStorage if necessary
      localStorage.removeItem("yourUserTokenKey"); // replace with your token key if used

      // Dispatch success action and redirect
      dispatch(deleteUsersuccess(data));
      navigate("/"); // Redirect to homepage after deletion
    } catch (error) {
      dispatch(deleteUserfail(error.message));
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const token = currentUser?.token;
    console.log("token", token);
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formdata),
          credentials: "include",
        }
      );

      /*if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }*/

      const data = await res.json();
      console.log("Response data:", data);
      if (data.success === false) {
        dispatch(updateUserfail(data.message));

        return;
      }
      dispatch(updateUsersuccess(data));
      setupdatestatus(true);
    } catch (error) {
      dispatch(updateUserfail(error.message));
    }
  };

  const handleShowlist = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/listing/${currentUser._id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setshowlisterror(true);
        return;
      }
      setuserlist(data);
    } catch (error) {
      setshowlisterror(true);
    }
  };

  const handlesignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user/Signout");
      const data = await res.json;
      if (data.success === false) {
        dispatch(signoutUserfail(data.message));
        return;
      }
      dispatch(signoutUsersuccess(data));
    } catch (error) {
      dispatch(signoutUserfail(data.message));
    }
  };

  const handlelistingdelete = async (listid) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/list/delete/${listid}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setuserlist((prev) => prev.filter((list) => list._id !== listid));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7"> Profile</h1>
      <form onSubmit={handlesubmit} className=" flex flex-col gap-4">
        <input type="file" ref={fileref} hidden accept="image/*" />
        <img
          onClick={() => fileref.current.click()}
          src={formdata.avater || currentUser.avater}
          alt="404 error"
          className=" rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          id="username"
          onChange={handlechange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
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
          update
        </button>
        <Link
          className="bg-green-700 text-white p-3 uppercase rounded-lg text-center hover:opacity-95 disabled:opacity-80"
          to={"/create-list"}
        >
          create listing
        </Link>
      </form>
      <div className=" flex justify-between mt-5">
        <span onClick={handledelete} className=" text-red-700 cursor-pointer">
          {" "}
          Delete Account
        </span>
        <span className=" text-red-700 cursor-pointer" onClick={handlesignout}>
          {" "}
          Sign out
        </span>
      </div>
      <p className=" text-green-700">{updatestatus ? "User is Update" : ""}</p>
      <button onClick={handleShowlist} className=" text-green-700 w-full ">
        Show Listing
      </button>
      <p className=" text-red-700 mt-5">
        {showlisterror ? "Error showing listing" : ""}
      </p>

      {userlist && userlist.length > 0 && (
        <div className=" flex flex-col gap-4">
          <h1 className="text-center text-2xl font-semibold mt-7">
            {" "}
            Your Listings
          </h1>
          {userlist.map((list) => (
            <div
              key={list._id}
              className=" border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link
                href={`http://localhost:3000/api/user/listing/${list._id}`}
                rel="noopener noreferrer"
              >
                <img
                  src={list.image[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline flex-1 truncate"
                href={`http://localhost:3000/api/user/listing/${list._id}`}
                rel="noopener noreferrer"
              >
                {" "}
                <p>{list.name}</p>{" "}
              </Link>
              <div className=" flex flex-col items-center">
                <button
                  onClick={() => handlelistingdelete(list._id)}
                  className=" text-red-700 uppercase"
                >
                  {" "}
                  delete
                </button>
                <Link to={`/updatelist/${list._id}`}>
                <button className=" text-green-700 uppercase"> Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
