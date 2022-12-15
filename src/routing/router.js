import { createBrowserRouter } from "react-router-dom";
import Mainpage from "../Layout/Mainpage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Quize from "../pages/Quize";
import Register from "../pages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage></Mainpage>,
    children: [
      {
        path: "/", element: <Home />,
      },
      {
        path: "/login",element: <Login />
      },
      {
        path: "/register",element: <Register/>
      },
      {
        path: "/quize",element: <Quize/>
      },
    ],
  },
]);

export default router;
