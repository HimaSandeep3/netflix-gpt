import React, { useEffect } from "react";
import { signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addUser,removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
const Header = () => {
  const navigate = useNavigate();
  const user=useSelector(store=>store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) { //SignIn/SignUp
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
      } else { //signOut
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="Netflix_Logo"
      />
      {user && (
        <div className="flex p-2 gap-[6px] flex-col items-center">
          <div className="flex justify-between gap-4">
            <img
              className="w-12 h-12"
              src={user?.photoURL}
              alt="user_icon"
            />
            <button
              className="bg-red-500 text-white hover:bg-red-600 rounded-md h-12 w-24 font-semibold"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
          <p className="text-white text-s">Hello, <span className="text-xl">{user.displayName ?? "User"}</span></p>
        </div>
      )}
    </div>
  );
};

export default Header;
