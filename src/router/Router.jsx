import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout"
import Home from "../pages/Home/Home";
import JoinUs from "../pages/JoinUs/JoinUs";
import Payment from "../pages/Home/HomeElements/Membership/Payment/Payment";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<RootLayout/>,
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
            path:'/payment',
            element:<Payment/>
        }
      ]
    },
  ]);
