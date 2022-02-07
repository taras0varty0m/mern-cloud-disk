import React from "react";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../actions/userActions";

import Input from "../input/Input";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex flex-col items-center justify-center text-center ">
      <div className="w-full min-h-screen flex flex-col items-center pt-6 ">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h2 className="mb-12 text-center text-5xl font-extrabold">
            Welcome.
          </h2>
          <form onSubmit={onSubmit}>
            <div className="relative w-full mt-10 space-y-8">
              <div className="relative">
                <label className="block mb-1">
                  Email
                  <Input
                    autoFocus
                    value={email}
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </label>
              </div>
              <div className="relative">
                <label className="block mb-1">
                  Password
                  <Input
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    name="password"
                  />
                </label>
              </div>
              <div className="mt-6">
                <button
                  className="inline-block w-full px-5 py-4 mt-6 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <div className="mt-6 text-center">
                <NavLink to="/registration" className="underline">
                  Sign up for an account
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
