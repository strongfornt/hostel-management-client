import {  useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom/dist";

import profile from "./../../assets/Profile/deFaultProfile1.png";
import { useLocation } from "react-router-dom";
import { calculateScrollbarWidth } from "./ScrollBar";

import OutsideClickHandler from "react-outside-click-handler";
import { SiReactrouter } from "react-icons/si";

import {  IoMdArrowDropup } from "react-icons/io";
import { MdBrowserUpdated, MdLogout } from "react-icons/md";


import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Nav() {
  const [scrollY, setScrollY] = useState(0);

  const { user, loading, logOut, theme, setTheme, menu, setMenu } =
    useAuth()
  const location = useLocation();
  

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast("See you soon!")
      })
      
  };

  useEffect(() => {
    if (menu) {
      const scrollbarWidth = calculateScrollbarWidth();

      document.body.style.paddingRight = `${scrollbarWidth}px`;

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0";

      document.body.style.overflow = "auto";
    }
  }, [menu]);

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("halloween");
    } else {
      setTheme("light");
    }
  };

  const responsiveNavLinks = (
    <>
     <NavLink
        onClick={() => setMenu(false)}
        to="/"
        className={({ isActive }) =>
          isActive
            ? ` text-[#3F72AF] w-fit text-sm font-medium  `
            : `text-sm w-fit  font-medium hover:text-[#3F72AF] duration-300 `
        }
      >
        <p className="">Home</p>
      </NavLink>
      

      <NavLink
        onClick={() => setMenu(false)}
        to="/meals"
        className={({ isActive }) =>
          isActive
            ? ` text-[#3F72AF] w-fit text-sm font-medium  `
            : `text-sm w-fit  font-medium hover:text-[#3F72AF] duration-300 `
        }
      >
        <p className="">Meals</p>
      </NavLink>
      <NavLink
        onClick={() => setMenu(false)}
        to="/addTouristSpot"
        className={({ isActive }) =>
          isActive
            ? ` text-[#3F72AF] w-fit text-sm font-medium  `
            : `text-sm w-fit  font-medium hover:text-[#3F72AF] duration-300 `
        }
      >
        <p className="">Upcoming-Meals</p>
      </NavLink>
      
      {
        user &&<NavLink
        onClick={() => setMenu(false)}
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? ` text-[#3F72AF] w-fit text-sm font-medium  `
            : `text-sm w-fit  font-medium hover:text-[#3F72AF] duration-300 `
        }
      >
        <p className="">Dashboard</p>
      </NavLink>
      }
 
    </>
  );

  const navLinks = (
    <>
      <NavLink
        onClick={() => {
          setMenu(false);
         
        }}
        to="/"
        className={({ isActive }) =>
          isActive
            ? ` text-[#3F72AF] w-fit  text-sm font-medium  `
            : `text-sm w-fit  font-medium  hover:text-[#3F72AF] duration-300  `
        }
      >
        <p className="">Home</p>
      </NavLink>
     
 
      <NavLink
                    onClick={() => {
                      setMenu(false);
                      
                    }}
                    to="/meals"
                    className={({ isActive }) =>
                      isActive
                        ? ` text-[#3F72AF] w-fit text-sm font-medium  `
                        : `text-sm w-fit ${
                            location.pathname === "/" &&
                            scrollY < 199 &&
                            "text-white"
                          }  font-medium hover:text-[#3F72AF] duration-300 `
                    }
                  >
                    <p className="">Meals</p>
                  </NavLink>
                  <NavLink
                    onClick={() => {
                      setMenu(false);
                      
                    }}
                    to="/upcomingMeals"
                    className={({ isActive }) =>
                      isActive
                        ? ` text-[#3F72AF] w-fit text-sm font-medium  `
                        : `text-sm w-fit  ${
                            location.pathname === "/" &&
                            scrollY < 199 &&
                            "text-white"
                          } font-medium hover:text-[#3F72AF] duration-300 `
                    }
                  >
                    <p className="">Upcoming-Meals</p>
                  </NavLink> 
                  <NavLink
                    onClick={() => {
                      setMenu(false);
                    
                    }}
                    to="/joinUs"
                    className={({ isActive }) =>
                      isActive
                        ? ` text-[#3F72AF] w-fit text-sm font-medium  `
                        : `text-sm w-fit ${
                            location.pathname === "/" &&
                            scrollY < 199 &&
                            "text-white"
                          }  font-medium hover:text-[#3F72AF] duration-300 `
                    }
                  >
                    <p className="">Join-Us</p>
                  </NavLink> 
                  
                 
    </>
  );

  return (
    <>
   
      <header className="relative  z-30 ">
        <div
          className={`navbar px-2 py-0  md:px-4 lg:8  ${
            scrollY < 199
              ? "top-[0.1px] bg-transparent shadow-sm"
              : scrollY > 199
              ? "   flex"
              : "hidden"
          } ${
            scrollY > 220
              ? `fixed ${
                  theme === "light" ? "bg-white" : "bg-[#2e3034]"
                } z-30 top-0 transition-all duration-500 flex shadow-sm `
              : "absolute -top-32 "
          }`}
        >
          <div className="navbar-start w-fit ">
            <a className=" text-2xl font-bold  text-[#3F72AF] ">
              <span className="text-3xl font-bold">D</span>ine
              <span
                className={`font-bold ${
                  theme === "light"
                    ? location.pathname === "/"
                      ? scrollY < 199
                        ? "text-white"
                        : "text-[#4b5664]"
                      : "text-[#4b5664]"
                    : "text-white"
                }`}
              >
                Ease
              </span>
            </a>
          </div>
          {/* <div className="navbar-end hidden lg:flex"></div> */}
          <div className="navbar-end flex-1  ">
            <label className="cursor-pointer  mr-4  md:hidden grid place-items-center">
              <input
                onChange={handleTheme}
                type="checkbox"
                value="halloween"
                checked={theme === "light" ? false : true}
                className="toggle theme-controller bg-base-content row-start-1 h-5  col-start-1 col-span-2"
              />
              <svg
                className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>

            {/* responsive menu start */}
            <OutsideClickHandler onOutsideClick={() => setMenu(false)}>
              <div className="items-center flex   md:hidden">
                <label className=" swap swap-rotate  border-none  ">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    onChange={() => {
                      setMenu(!menu);
                    }}
                    checked={menu ? true : false}
                  />

                  {/* hamburger icon */}

                  <svg
                    className={`swap-off fill-current z-30 ${
                      theme === "light"
                        ? location.pathname === "/"
                          ? scrollY < 199
                            ? "text-white"
                            : "text-[#4b5664]"
                          : "text-[#4b5664]"
                        : "text-white"
                    }  `}
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  {/* close icon */}
                  <svg
                    className={`swap-on fill-current z-30 ${
                      theme === "light"
                        ? location.pathname === "/"
                          ? scrollY < 199
                            ? "text-white"
                            : "text-[#4b5664]"
                          : "text-[#4b5664]"
                        : "text-white"
                    } `}
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </label>
              </div>

              <ul
                tabIndex={0}
                className={`menu absolute mr-6  -left-64 -translate-y-[3.6rem] min-w-60 menu-sm md:hidden text-xl  dropdown-content border-opacity-60 
                   mt-3 z-[10] shadow-lg  bg-base-100  min-h-screen  rounded-r-xl   gap-2    ${
                     menu && " -left-[0.1rem]  duration-300 transition-all  "
                   }`}
              >
                {user && (
                  <li className="flex  items-center    ">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring-1 ring-[#4b5664] ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || profile} />
                      </div>
                    </div>
                    <div>
                      <h2
                        className={`text-lg font-bold ${
                          theme === "light" ? "text-[#191515]" : "text-white"
                        }  `}
                      >
                        {user?.displayName || "Anonymous"}
                      </h2>
                    </div>
                  </li>
                )}

                <li
                  className={` rounded-md bg-gray-800 text-white  `}
                  // ${user ? "" : "mt-16"}
                >
                  <p className={`flex items-center p-2 space-x-3 rounded-md  `}>
                    <SiReactrouter
                      className={`text-xl  ${
                        location.pathname == "/" ? "text-red-800" : "text-white"
                      } `}
                    />
                    <span>Route</span>
                  </p>
                </li>
                {responsiveNavLinks}

                <div
                  className={` ${
                    theme === "light" ? "bg-gray-800" : "bg-white"
                  } w-full inline-flex h-[1px] my-2`}
                ></div>
                <li className="">
                  {user ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenu(false);
                      }}
                      className={`flex px-2 py-1 w-fit  relative rounded group overflow-hidden font-medium border-b  
                    ${
                      theme === "light"
                        ? "border-gray-800 text-gray-800"
                        : "border-gray-50 text-white"
                    }
              `}
                    >
                      <span
                        className={`absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 ${
                          theme === "light" ? "bg-gray-800" : "bg-gray-50"
                        }  group-hover:h-full opacity-90`}
                      ></span>
                      <span
                        className={`relative ${
                          theme === "light"
                            ? "group-hover:text-white"
                            : "group-hover:text-black"
                        } `}
                      >
                        Logout
                      </span>
                    </button>
                  ) : (
                    <>
                       <Link
                      to="/login"
                      onClick={() => setMenu(false)}
                      className={`flex px-6  py-1 w-fit mb-4 relative rounded group overflow-hidden font-medium border-b  
                      ${
                        theme === "light"
                          ? "border-gray-800 text-gray-800"
                          : "border-gray-50 text-white"
                      }
              
              `}
                    >
                      <span
                        className={`absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0  ${
                          theme === "light" ? "bg-gray-800" : "bg-gray-50"
                        } group-hover:h-full opacity-90`}
                      ></span>
                      <span
                        className={`relative ${
                          theme === "light"
                            ? "group-hover:text-white"
                            : "group-hover:text-black"
                        }  `}
                      >
                        Login
                      </span>
                    </Link> 
                    <Link
                      to="/register"
                      onClick={() => setMenu(false)}
                      className={`flex px-4 py-1 w-fit  relative rounded group overflow-hidden font-medium border-b  
                      ${
                        theme === "light"
                          ? "border-gray-800 text-gray-800"
                          : "border-gray-50 text-white"
                      }
              
              `}
                    >
                      <span
                        className={`absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0  ${
                          theme === "light" ? "bg-gray-800" : "bg-gray-50"
                        } group-hover:h-full opacity-90`}
                      ></span>
                      <span
                        className={`relative ${
                          theme === "light"
                            ? "group-hover:text-white"
                            : "group-hover:text-black"
                        }  `}
                      >
                        Register
                      </span>
                    </Link>
                    </>
                  )}
                </li>
              </ul>
            </OutsideClickHandler>
            {/* responsive menu end    */}

            <ul className="menu menu-horizontal px-1 py-0 h-16 md:gap-8 hidden  md:flex items-center ">
          

              
              {navLinks}

              {loading ? (
                <div className=" md:flex hidden  items-center gap-1">
                  <div
                    className=" tooltip-left md:tooltip-bottom tooltip  flex items-center "
                    data-tip={user?.displayName || "Anonymous"}
                  >
                    <div className="avatar">
                      <div className="w-8 rounded-full tooltip  ">
                        <img src={user?.photoURL || profile} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                user && (
                    <div
                className={`h-full  relative group  flex items-center justify-center `}
              >
                <button
                 
                >
                  <div className=" md:flex hidden  items-center gap-1">

                  <div className="avatar">
                        <div className="w-8 rounded-full tooltip  ">
                          <img src={user?.photoURL || profile} />
                        </div>
                      </div>
              
                  </div>
                </button>

                <ul
                  className="h-fit -translate-y-44 -translate-x-28   group-hover:translate-y-[6.7rem]  transition-transform duration-500
             w-40 px-4 py-4   bg-black text-white  absolute left-0 bottom-0"
                >
                    
                    <IoMdArrowDropup className="text-black text-4xl absolute translate-x-24  -translate-y-[2.3rem] " />
                    <div className="flex flex-col justify-end items-end gap-2">
                    { user && <>
                   <h1 className=" text-sm" >{user?.displayName || "Anonymous"}</h1>
                   <NavLink
                    onClick={() => {
                      setMenu(false);
                     
                    }}
                    to="/updateProfile"
                    className={({ isActive }) =>
                      isActive
                        ? ` text-[#3F72AF] w-fit text-sm   `
                        : `text-sm w-fit ${
                            location.pathname === "/" &&
                            scrollY < 199 &&
                            "text-white"
                          }   hover:text-[#3F72AF] duration-300 `
                    }
                  >
                    <p className="flex items-center gap-1"> <MdBrowserUpdated className="text-white" /> Update profile</p>
                  </NavLink>
                    <button onClick={handleLogout} className="flex items-center text-sm gap-1" > <MdLogout /> logout</button>
                   </>}
                    </div>
                </ul>
              </div>
                  
                )
              )}

             
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}