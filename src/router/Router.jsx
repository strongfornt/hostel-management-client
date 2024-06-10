import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout"
import Home from "../pages/Home/Home";
import JoinUs from "../pages/JoinUs/JoinUs";
import Payment from "../pages/Home/HomeElements/Membership/Payment/Payment";
import axios from "axios";
import UserPrivateRoute from "./Private/UserPrivateRoute";
import Error from "../shared/Error/Error";

import AdminProfile from "../Dashboard/AdminDashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Dashboard/AdminDashboard/ManageUser/ManageUsers";
import DashboardLayout from "../RootLayout/DashboardLayout";
import AddMeal from "../Dashboard/AdminDashboard/AddMeal/AddMeal";
import AllMeals from "../Dashboard/AdminDashboard/AllMeals/AllMeals";
import Meals from "../pages/Meals/Meals";
import UpcomingMeals from "../Dashboard/AdminDashboard/UpcomingMeals/UpcomingMeals";
import UpcomingPublicMeals from "../pages/UpcomingPublicMeals/UpcomingPublicMeals";
import MealsDetails from "../Components/MealsDetails/MealsDetails";
import AdminPrivateRoute from "./Private/AdminPrivateRoute";
import Profile from "../Dashboard/Profile/Profile";
import RequestMeal from "../Dashboard/UserDashboard/RequestedMeal/RequestMeal";

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
        },
        {
          path:'/meals',
          element:<Meals/>
        },
        {
          path: '/upcomingPublicMeals',
          element:<UpcomingPublicMeals/>
        },
        {
          path:'/mealsDetails/:id',
          element:<MealsDetails/>
        }
      ]
    },
    //dashboard start here====
    {
        path:'/dashboard',
        element:<UserPrivateRoute><DashboardLayout/></UserPrivateRoute>,
        children:[
           //admin dashboard start ================================================4
           {
            index:true,
            element:<UserPrivateRoute><Profile/></UserPrivateRoute>
           },
           {
            path:'manageUsers',
            element:<AdminPrivateRoute><ManageUsers/></AdminPrivateRoute>
           },
           {
            path:'addMeal',
            element:<AdminPrivateRoute><AddMeal/></AdminPrivateRoute>
           },
           {
            path:'allMeals',
            element:<AdminPrivateRoute><AllMeals/></AdminPrivateRoute>
           },
           {
            path:'upcomingMeals',
            element:<AdminPrivateRoute><UpcomingMeals/></AdminPrivateRoute>
           },
           //admin dashboard end ================================================
           //user dashboard start ==========================================
           {
            path:'requestedMeals',
            element:<UserPrivateRoute><RequestMeal/></UserPrivateRoute>
           }
           //user dashboard end ==========================================
        ]
    }
  ]);
