import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

import About from "./pages/About";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Header from "./component/Header";
import Privateroute from "./component/Privateroute";
import Createlist from "./pages/Createlist";
import Listing from "./pages/Listing";
import Updatelisting from "./pages/Updatelisting";
const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/sign-in" element={<Signin></Signin>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/listing/:listId" element={<Listing></Listing>}></Route>

        <Route element={<Privateroute></Privateroute>}>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route
            path="/create-list"
            element={<Createlist></Createlist>}
          ></Route>
          <Route
            path="/updatelist/:listId"
            element={<Updatelisting></Updatelisting>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
