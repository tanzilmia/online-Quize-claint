import { createBrowserRouter } from "react-router-dom";
import Mainpage from "../Layout/Mainpage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Quize from "../pages/Quize";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivetRouting from "./PrivetRouting";
import Error from "../pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage></Mainpage>,
    errorElement : <Error></Error>,
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
        path: "/quize",element: <PrivetRouting><Quize/></PrivetRouting>
      },
      {
        path: "/profile",element: <PrivetRouting><Profile/></PrivetRouting>
      },
    ],
  },
]);

export default router;
