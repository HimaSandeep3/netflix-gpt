import { createBrowserRouter, RouterProvider} from "react-router-dom";
import React, { useEffect } from "react";
import Browse from "./Browse";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { auth } from "../utils/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) { //SignIn/SignUp
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
      } else { //signOut
        dispatch(removeUser());
      }
    });
  }, []);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
