import React from "react";
import Header from "./Header";
import { useState } from "react";
const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  return (
    <div className="h-screen bg-black">
      <Header />
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg"
          alt="dashBoard_img"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit">
        <div className="bg-black opacity-75 p-8 rounded-md shadow-md w-96">
          <h1 className="text-white text-3xl font-bold mb-6">
            {showSignUp ? "Sign Up" : "Sign In"}
          </h1>
          <form>
            {showSignUp && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="block w-full p-2 text-lg text-white bg-gray-800 rounded-md"
                />
              </div>
            )}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email or mobile number"
                className="block w-full p-2 text-lg text-white bg-gray-800 rounded-md"
              />
            </div>
            <div className="mb-8">
              <input
                type="password"
                placeholder="Password"
                className="block w-full p-2 text-lg text-white bg-gray-800 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-full"
            >
              {showSignUp ? "Sign Up" : "Sign In"}
            </button>
            <p className="text-gray-400 text-sm mt-4" onClick={toggleSignUp}>
              {showSignUp ? "Already a member? " : "New to Netflix? "}
              <span className="text-blue-500 cursor-pointer">
                {showSignUp ? "Sign in now." : "Sign up now."}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
