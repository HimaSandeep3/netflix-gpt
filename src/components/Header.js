import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user=useSelector(store=>store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix_Logo"
      />
      {user && (<div className="flex p-2 gap-[6px]">
        <img
          className="w-12 h-12"
          src={user?.photoURL}
          alt="user_icon"
        />
        <button
          className="bg-red-500 text-white p-2 rounded-md h-12 w-24 font-semibold"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>)}
    </div>
  );
};

export default Header;
