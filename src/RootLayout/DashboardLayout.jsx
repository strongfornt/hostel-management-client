import { Outlet, ScrollRestoration} from "react-router-dom";


import Dashboard from "../Dashboard/DasboardBar/Dashboard";
import DashboardNavbar from "../Dashboard/DashboardNav/DashboardNavbar";


export default function DashboardLayout() {
   
  return (
    <div className=" min-h-screen md:flex">
         <ScrollRestoration />
         <header className="md:hidden" >
                <DashboardNavbar/>
         </header>
        <header className=" hidden md:fixed md:flex ">
                
            <Dashboard/>
        </header>

        <main className=" flex-1 px-2 md:px-4 lg:ml-64 xl:ml-20  " >

           
        <Outlet/>
       
        </main>


    </div>
  )
}