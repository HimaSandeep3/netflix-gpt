import { createBrowserRouter, RouterProvider} from "react-router-dom";
import React from "react";
import Browse from "./Browse";
import Login from "./Login";
const Body = () => {
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
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
