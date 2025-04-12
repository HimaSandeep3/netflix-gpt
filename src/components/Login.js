import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateForm, validateEmailAndPassword, validateEmail } from "../utils/Validate";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { DASHBOARD_IMG, USER_IMG } from "../utils/constants";

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const dispatch = useDispatch();
  const fName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const submitForm = () => {
    if (showSignUp) {
      const res = validateForm(email.current.value, password.current.value, fName.current.value);
      setErrorMsg(res);
      if (res) {
        return;
      }
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fName.current.value,
            photoURL: USER_IMG,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  console.log("Email verification sent!");
                })
                .catch((error) => {
                  setErrorMsg("Error sending email verification:", error);
                  console.log("Error sending email verification:", error);
                });
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage) setErrorMsg("Email already exists");
        });
    } else {
      const res = validateEmailAndPassword(email.current.value, password.current.value);
      setErrorMsg(res);
      if (res) {
        return;
      }
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("password")) {
            setErrorMsg("Invalid Email or Password");
            setForgotPassword(true);
          } else {
            setErrorMsg("Invalid Email or Password");
          }
        });
    }
  };

  const handleForgotPassword = () => {
    const res = validateEmail(forgotEmail);
    setErrorMsg(res);
    if (res) {
      return;
    }
    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        console.log("Password reset email sent!");
        setForgotPassword(false);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="h-screen bg-black">
      <Header />
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={DASHBOARD_IMG}
          alt="dashBoard_img"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit">
        <div className="bg-black opacity-75 p-8 rounded-md shadow-md w-96">
          <h1 className="text-white text-3xl font-bold mb-6">
            {showSignUp ? "Sign Up" : "Sign In"}
          </h1>
          <form onSubmit={(e) => e.preventDefault()}>
            {showSignUp && (
              <div className="mb-4">
                <input
                  ref={fName}
                  type="text"
                  placeholder="Full Name"
                  className="block w-full p-2 text-lg text-white bg-gray-800 rounded-md"
                />
              </div>
            )}
            {forgotPassword ? (
              <div className="mb-8 ">
                <p className="text-white text-lg mb-4">
                  Enter your Email to reset your password
                </p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full p-2 text-lg text-white bg-gray-800 rounded-md"
                />
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-full mt-5"
                  onClick={handleForgotPassword}
                >
                  Send Password Reset Email
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <input
                    ref={email}
                    type="email"
                    placeholder="Email"
                    className="block w-full p-2 text-lg text-white bg-gray-800 rounded-md"
                  />
                </div>
                <div className="mb-8">
                  <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="block w-full p-2 text-lg text-white bg-gray-800 rounded-md"
                  />
                </div>
              </>
            )}
            <p className="text-red-500 text-lg mb-4 font-bold">{errorMsg}</p>
            {forgotPassword ? (
              <button
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-full"
                onClick={() => setForgotPassword(false)}
              >
                Back to Sign In
              </button>
            ) : (
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-full"
                onClick={submitForm}
              >
                {showSignUp ? "Sign Up" : "Sign In"}
              </button>
            )}
          </form>
          {showSignUp && (
            <p onClick={toggleSignUp} className="text-gray-400 text-sm mt-4">
              Already a member? <span className="text-blue-500 cursor-pointer">Sign In now.</span>
            </p>
          )}
          {!showSignUp && !forgotPassword && (
            <p className="text-gray-400 text-sm mt-4" onClick={toggleSignUp}>
              {showSignUp ? "Already a member? " : "New to Netflix? "}
              <span className="text-blue-500 cursor-pointer">
                {showSignUp ? "Sign in now." : "Sign Up now."}
              </span>
            </p>
          )}
          {!showSignUp && !forgotPassword && (
            <p className="text-gray-400 text-sm mt-4">
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setForgotPassword(true)}
              >
                Forgot Password?
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;