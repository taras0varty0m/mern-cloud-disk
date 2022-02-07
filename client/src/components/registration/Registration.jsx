import React from "react";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registration } from "../../actions/userActions";

import Input from "../input/Input";

export const Registration = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(registration(email, password));
  };
  return (
    <div className="flex flex-col items-center justify-center text-center ">
      <div className="w-full min-h-screen bg-white lg:w-6/12 xl:w-5/12">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <h4 className="w-full text-3xl font-bold">Signup</h4>
          <p className="text-lg text-gray-500">
            or, if you have an account you can{" "}
            <NavLink to="/login" className="text-blue-600 underline">
              sign in
            </NavLink>
          </p>
          <form onSubmit={onSubmit}>
            <div className="relative w-full mt-10 space-y-8">
              <div className="relative">
                <label className="font-medium text-gray-900">
                  Email
                  <Input
                    autoFocus
                    required
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className="relative">
                <label className="font-medium text-gray-900">
                  Password
                  <Input
                    required
                    type="password"
                    minLength={8}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className="relative">
                <button
                  type="submit"
                  className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
