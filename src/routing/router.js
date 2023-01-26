import { createBrowserRouter } from "react-router-dom";
import Mainpage from "../Layout/Mainpage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import PrivetRouting from "./PrivetRouting";
import DashBoard from "../AdminPanel/DashBoard";
import AdminRouting from "./AdminRouting";
import AddQuize from "../AdminPanel/AddQuize";
import UserInfo from "../AdminPanel/UserInfo";
import UserHistory from "../AdminPanel/UserHistory";
import QuizeSetting from "../AdminPanel/QuizeSetting";
import Quizes from "../pages/Quizes";
import PlayQuize from "../components/PlayQuize";
import SingleUserHistory from "../AdminPanel/SingleUserHistory";
import Myprofile from "../pages/Myprofile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage></Mainpage>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/quize",
        element: <PrivetRouting><Quizes/></PrivetRouting>
      },
      {
        path: "/playQuize/:categoryName",
        element: <PrivetRouting> <PlayQuize/> </PrivetRouting>,
        loader : ({params})=> fetch(`http://localhost:5000/playQuize/${params.categoryName}`)
      },
      {
        path: "/single-user-info/:email",
        element: <PrivetRouting> <SingleUserHistory/> </PrivetRouting>,
        loader : ({params})=> fetch(`http://localhost:5000/single-user-info/${params.email}`)
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path:"/profile",
        element : <PrivetRouting> <Myprofile/> </PrivetRouting>
      },
      {
        path: "/dashboard",
        element: (
          <AdminRouting>
            {" "}
            <DashBoard />{" "}
          </AdminRouting>
        ),
      },
      {
        path: "/dashboard/addQuize",
        element: (
          <AdminRouting>
            <AddQuize />
          </AdminRouting>
        ),
      },
      {
        path: "/dashboard/userinfo",
        element: (
          <AdminRouting>
            <UserInfo />
          </AdminRouting>
        ),
      },
      {
        path: "/dashboard/userHistory",
        element: (
          <AdminRouting>
            <UserHistory />
          </AdminRouting>
        ),
      },
      {
        path: "/dashboard/settings",
        element: (
          <AdminRouting>
           <QuizeSetting/>
          </AdminRouting>
        ),
      },
    ],
  },
]);

export default router;
