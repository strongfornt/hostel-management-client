import { Helmet } from "react-helmet-async/lib";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "./Login";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from "react";
import Register from "./Register";

export default function JoinUs() {
    const {theme} =  useAuth()
    const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <Helmet>
        <title>DineEase | JoinUs</title>
      </Helmet>

      <div
        className={`${
          theme === "light" && "bg-[#F9F7F7]"
        } pt-24 pb-12 space-y-3`}
      >
        <h1
          className={`text-center text-3xl  md:text-4xl font-semibold ${
            theme === "light" && "text-[#4b5664]"
          }`}
        >
          Join <span className="text-[#3F72AF]">Us</span>
        </h1>
        <div className="flex gap-1 justify-center items-center w-fit mx-auto  relative  ">
          <Link to="/">
            <p className={`${theme === "light" ? "text-black/65" : ""}`}>
              Homepage
            </p>
          </Link>

          <p
            className={`text-sm ${
              theme === "light" ? "text-black/45" : "text-white/55"
            } flex items-center`}
          >
            {" "}
            <p>
              <MdKeyboardArrowRight />
            </p>{" "}
            Join-Us
          </p>
          <span className="inline-flex w-full absolute bg-[#F7F7F7] translate-y-6 h-[1px]">
            {" "}
          </span>
        </div>
      </div>

           <section className="md:px-4 px-2 mt-2">
           
           <Tabs selectedIndex={tabIndex} onSelect={(index) => {
            
            setTabIndex(index)
           }}>
      <TabList  >
        <Tab>Login</Tab>
        <Tab>Register</Tab>
      </TabList>
      <TabPanel>
         <Login setTabIndex={setTabIndex} />
      </TabPanel>
      <TabPanel>
        <Register setTabIndex={setTabIndex} />
      </TabPanel>
    </Tabs>
           </section>
           

    </>
  );
}
