import { createBrowserRouter } from "react-router-dom";
import Mainpage from "../Layout/Mainpage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
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
      
    ],
  },
]);

export default router;
