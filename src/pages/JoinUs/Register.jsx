/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
import {   useEffect, useState } from "react";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Fade } from "react-awesome-reveal";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../shared/util/imageUpload";
import auth from "../../Firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";


export default function Register({setTabIndex}) {
  const {createUser,updateUserProfile,theme,setUser,user} = useAuth()
  const [passToggle, setPassToggle] = useState(false);
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors, isSubmitted },
  } = useForm();

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      return "Missing Uppercase letters in your password!";
    }
    if (!/[a-z]/.test(password)) {
      return "Missing lowercase letters in your password!";
    }

    return true;
  };

  const formSubmit = async (data) => {
    const { name, photo, email, password } = data;
   const imageFile = photo[0];
    
     const image = await imageUpload(imageFile);
     createUser(email, password)
     .then((users) => {
       const user = users.user;
       toast.success("Account created! Welcome!");
       //update profile
        if(image){
            updateUserProfile(auth.currentUser, {
                displayName: name,
                photoURL: image,
                
              })
                .then(() => {
                  setUser({ ...user, displayName: name, photoURL: image });
                  //send user info to the db start ==========================
                  const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    role:'User',
                    photo:user?.photoURL,
                    badge:"Bronze"
                }
                // console.log(userInfo);
                 axiosPublic.post('/users',userInfo)
                   .then(()=>{
                    // console.log('from auth',res);
                   });
                  //send user info to the db end ==========================
                })
                .catch(() => {});
        }
     })
     .catch(() => toast.error("User already exist!"));

    reset();
  };
  
  useEffect(() => {
    if (user) {
        navigate('/')
    }
  }, [ navigate, user]);

  return (
    <>
      
      <section className="flex justify-between mt-5 mb-10">
        {/* register side start */} 
        <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex border-r flex-1  "
      >
        <div className="flex flex-col w-full  p-6  rounded-md  ">
          <div className="mb-4 md:text-start text-center">
           <Fade direction="down" delay={200} triggerOnce={true} cascade={false} >
           <h1
              data-aos="zoom-in"
              data-aos-delay="500 "
              data-aos-duration="1000"
              className="mt-1 text-2xl  md:text-3xl font-semibold text-start  text-[#3F72AF]
              "
            >
              Register   <span
                  className={`${
                    theme === "light" ? "text-[#4b5664]" : "text-white"
                  } `}
                >
                  here
                </span>
            </h1>
            {/* <p
              data-aos="zoom-in-up"
              data-aos-delay="500 "
              data-aos-duration="1000"
              className={`text-sm  ${theme ==="light"?'text-[#4b5664]':'text-white'} mb-2`}
            >
              Register now and be part of our community!
            </p> */}
           </Fade>
          </div>
          <form
            onSubmit={handleSubmit(formSubmit)}
            action=""
            className="space-y-10"
          >
            <div className="space-y-4">
             <Fade direction="up" delay={300} triggerOnce={true} cascade={false}>
             <div
                data-aos="zoom-in"
                data-aos-delay="500 "
                data-aos-duration="1000"
              >
                <label htmlFor="email" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  {...register("name")}
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="your name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-transparent outline-none focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div
                data-aos="zoom-in"
                data-aos-delay="500 "
                data-aos-duration="1000"
              >
                <label htmlFor="email" className="block mb-2 text-sm">
                  Photo
                </label>
                <input
                  {...register("photo")}
                  type="file"
                  name="photo"
                  id="photo"
                  required
                  placeholder="photo"
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-transparent  outline-none focus:ring-1 focus:ring-[#3F72AF] "
                />
              </div>
              <div
                data-aos="zoom-in"
                data-aos-delay="500 "
                data-aos-duration="1000"
              >
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  {...register("email")}
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="@gmail.com"
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-transparent  outline-none focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div
                data-aos="zoom-in"
                data-aos-delay="500 "
                data-aos-duration="1000"
                className="relative"
              >
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <input
                  required
                  {...register("password", {
                    validate: validatePassword,
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters or longer!",
                    },
                  })}
                  type={passToggle ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300  bg-transparent  outline-none focus:ring-1 focus:ring-[#3F72AF]"
                />

                {errors.password && isSubmitted && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPassToggle(!passToggle);
                  }}
                  className="absolute top-10 right-2"
                >
                  {passToggle ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </button>
              </div>
             </Fade>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-2 font-semibold text-xl rounded-md bg-transparent border border-[#3F72AF] hover:bg-[#3F72AF] text-[#3F72AF] hover:text-white duration-300"
                >
                  Register
                </button>
              </div>
              <p className={`px-6  md:hidden text-sm text-center ${theme === "light"?'text-gray-600':'text-white'}`}>
                Already have an account?
                <button
                  onClick={()=>  setTabIndex(0) }
                  className="hover:underline dark:text-[#3F72AF]"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
        {/* register side end */} 

         {/* Another side start          */} 
         <div className="flex-1 md:flex hidden px-4  ">
          <div className=" flex items-center justify-center">
            <Fade 
                direction="up"
                duration={1500}
                cascade={false}
                triggerOnce={true} 
            >
            <div className="space-y-2">
              <h1
                className={`md:text-3xl font-serif ${
                  theme === "light" && "text-[#4b5664]"
                }`}
              >
               Already Have an <span className="text-[#3F72AF]" >Account?</span>
              </h1>

              <p
                className={` lg:text-base font-sans md:text-sm ${
                  theme === "light" ? "text-black/55" : "text-white/60"
                }`}
              >
             Log in to access your dashboard, manage meals, and stay updated with the latest from our hostel community.
              </p>

            
             <button
             onClick={()=> setTabIndex(0) }
                data-aos="fade-up"
                data-aos-delay="500 "
                data-aos-duration="1000"
                href="#_"
                className="relative px-5 py-2 mt-2 overflow-hidden font-bold text-[#3F72AF]  border border-[#3F72AF] rounded-lg shadow-inner group"
              >
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#3F72AF] group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#3F72AF] group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#3F72AF] group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#3F72AF] group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#3F72AF] opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  Login
                </span>
              </button>
            
            </div>
            </Fade>
          </div>
        </div>
         {/* Another side end          */} 

      </section>
    </>
  );
}