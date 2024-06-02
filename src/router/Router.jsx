import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout"
import Home from "../pages/Home/Home";
import JoinUs from "../pages/JoinUs/JoinUs";

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
        }
      ]
    },
  ]);
