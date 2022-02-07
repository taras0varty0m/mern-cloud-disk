import React from "react";

import "./App.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { auth } from "./actions/userActions";

import { ResponsiveNavBar } from "./components/navbar/Navbar";
import { Registration } from "./components/registration/Registration";
import { Login } from "./components/login/Login";
import { Disk } from "./components/disk/Disk";
import { Footer } from "./components/footer/Footer";
import { NotFound } from "./components/notFound/NotFound";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  });

  return (
    <BrowserRouter>
      <ResponsiveNavBar />

      <Toaster position="bottom-right" />
      <div className="container mx-auto px-2">
        {!isAuth ? (
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route index element={<Disk />} />

            <Route path="/registration" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
