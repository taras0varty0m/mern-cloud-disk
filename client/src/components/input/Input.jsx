import React from "react";

const Input = (props) => (
  <input
    className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
    {...props}
  />
);

export default Input;
