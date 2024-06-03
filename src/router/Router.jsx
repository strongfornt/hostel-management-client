import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout"
import Home from "../pages/Home/Home";
import JoinUs from "../pages/JoinUs/JoinUs";
import Payment from "../pages/Home/HomeElements/Membership/Payment/Payment";
import axios from "axios";
import UserPrivateRoute from "./Private/UserPrivateRoute";
import Error from "../shared/Error/Error";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<RootLayout/>,
      errorElement:<Error/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/joinUs',
            element:<JoinUs/>
        },
        {
            path:'/payment/:name',
            element:<UserPrivateRoute><Payment/></UserPrivateRoute>,
            loader:({params}) => axios.get(`http://localhost:5000/membership/${params.name}`)
        }
      ]
    },
  ]);
