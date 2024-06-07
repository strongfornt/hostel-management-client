import toast from "react-hot-toast";
import { Fade } from "react-awesome-reveal";  
import { useEffect, useState } from "react";
import moment from 'moment-timezone';

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../shared/util/imageUpload";
import Swal from "sweetalert2";

export default function AddMeal() {
  const { user, theme, logOut } = useAuth();
  const {  email } = user || {};
  const [currentTime, setCurrentTime] = useState(
    moment.tz('Asia/Dhaka').format('MMMM DD, YYYY hh:mm:ss A')
  );

  const axiosSecure = useAxiosSecure();
  // update current time and date =============================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment.tz('Asia/Dhaka').format('MMMM DD, YYYY hh:mm:ss A'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // update current time and date =============================
  
  //handle form submit =======================================
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors, isSubmitted },
  } = useForm();

  const formSubmit = async (data) => {
    const {title,image,category,ingredients,price,rating,description} = data || {};
    const imageFile = image[0];
    const ingredientsItems = ingredients.split(',')
    //upload image to the image bb =================
    const imageUrl = await imageUpload(imageFile);
    //upload image to the image bb =================

    // if image url then send to the database =========
    if(imageUrl){
      const mealInfo = {
        title,
        images: imageUrl,
        category,
        ingredientsItems,
        price,
        rating,
        description,
        currentTime,
        likes: 0,
        reviews: 0,
        creator: {
          email: user?.email || 'Anonymous',
          name: user?.displayName || 'Anonymous'
        }
    }
    
    //call the meals collection api start================================
      try{
        const res = await axiosSecure.post('/meals',mealInfo)
        console.log(res);
        if(res?.data?.insertedId){
            // toast.success('Meals added smoothly!')
             //    swall message start======================x
          Swal.fire({
            title: "Meal Added!",
            text: "The meal has been successfully added. ",
            icon: "success",
          });
          //    swall message start======================x
            reset()
        }
      }catch(error){
        Swal.fire({
          title: "Failed to Add Meal!",
          text: "Oops! Something went wrong while trying to add the meal.",
          icon: "error",
        });
      }
    //call the meals collection api end================================
  
    }
    // if image url then send to the database end =========
  }
  //handle form submit end=======================================


  return (
    <>
      <Helmet>
        <title>TaskBud | CreateAssignment</title>
      </Helmet>

      {/* <div
        className={`${
          theme === "light" && "bg-[#F7F7F7]"
        } pt-24 pb-12 space-y-3`}
      >
        <h1
          className={`text-center text-3xl  md:text-4xl font-semibold ${
            theme === "light" && "text-[#4b5664]"
          }`}
        >
          Create Assignment
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
            Create Assignment
          </p>
          <span className="inline-flex w-full absolute bg-[#F7F7F7] translate-y-6 h-[1px]">
            {" "}
          </span>
        </div>
      </div> */}

      <section className="p-6 md:ml-[15rem] lg:ml-1  xl:ml-44  ">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="container flex flex-col mx-auto space-y-4 "
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-100">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <Fade
                direction="up"
                delay={200}
                cascade={false}
                triggerOnce={true}
              >
                <p className="font-medium text-lg text-[#3F72AF]">
                  <span
                    className={`${theme == "light" ? "text-[#4b5664]" : "text-white"
                      }`}
                  >
                    Add
                  </span>{" "}
                  Meal{" "}
                </p>
                <p
                  className={`text-xs  ${theme == "light" ? "text-[#4b5664]" : "text-[#d4cccc]"
                    } `}
                >
                  Submit meal information including title, category, image, ingredients, description, price, and rating.
                </p>
              </Fade>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="title" className="block text-sm">
                  Assignment Title
                </label>
                <input
                  required
                  {...register("title")}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Assignment title "
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300  focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="image" className="block text-sm    ">
                  Meal Image
                </label>
                <input
                  required
                  {...register("image")}
                  type="file"
                  name="image"
                  id="image"
                  placeholder="Meal image"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300  focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="category" className="block text-sm">
                  Meal Category
                </label>

                <select
                  required
                  {...register("category")}
                  id="category"
                  name="category"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300  focus:ring-1 focus:ring-[#3F72AF]"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="ingredients" className="block text-sm">
                  Ingredients
                </label>
                <input
                  required
                  {...register("ingredients")}
                  type="text"
                  name="ingredients"
                  id="ingredients"

                  placeholder="egg, potatoes..."
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="price" className="block text-sm">
                  Price
                </label>
                <input
                  required
                  {...register("price")}
                  type="number"
                  name="price"
                  id="price"
                  step="0.01" 
                  min="0"

                  placeholder="$Price"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="rating" className="block text-sm">
                  Rating
                </label>
                <input
                  required
                  {...register("rating")}
                  type="number"
                  name="rating"
                  id="rating"
                  step="0.01"
                  min={1}
                  max={5}
                  placeholder="Rating"
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="time" className="block text-sm">
                  Time
                </label>
                <input
                  required
                  type="text"
                  name="time"
                  id="time"
                  readOnly
                  value={currentTime}
                  placeholder="Time"
                  className="w-full px-3 cursor-not-allowed py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>

              <div className="col-span-full ">
                <label htmlFor="description" className="block text-sm">
                  Short description
                </label>
                <textarea
                  required
                  {...register("description")}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description "
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-100">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <Fade
                direction="up"
                delay={200}
                cascade={false}
                triggerOnce={true}
              >
                <p className="font-medium text-lg text-[#3F72AF] ">
                  <span
                    className={`${theme == "light" ? "text-[#4b5664]" : "text-white"
                      }`}
                  >
                    Per
                  </span>
                  sonal information{" "}
                </p>
                <p
                  className={`text-xs  ${theme == "light" ? "text-[#4b5664]" : "text-[#d4cccc]"
                    } `}
                >
                  {" "}
                  Provide your name and email for meal submission verification.
                </p>
              </Fade>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="email" className="block text-sm">
                  User Email
                </label>
                <input
                  readOnly
                  type="email"
                  name="email"
                  id="email"
                  placeholder="@gmail.com"
                  defaultValue={email}
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300  focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="name" className="block text-sm">
                  User Name
                </label>
                <input
                  readOnly
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  defaultValue={user?.displayName || "Anonymous"}
                  className="w-full px-3 py-2 border  outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
              </div>

              <div className="col-span-full md:col-span-2 lg:col-span-1 mt-5    ">
                <div className="flex items-center space-x-2">
                  <button
                    type="submit"
                    className="relative w-full px-5 py-3 overflow-hidden font-bold   border border-gray-200 rounded-lg shadow-inner group"
                  >
                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 
                    border-[#3F72AF]  group-hover:w-full ease"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 
                    border-[#3F72AF]   group-hover:w-full ease"></span>
                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 
                    bg-[#3F72AF]   group-hover:h-full ease"></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 
                    bg-[#3F72AF]   group-hover:h-full ease"></span>
                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#3F72AF]  opacity-0 group-hover:opacity-100"></span>
                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                      Submit
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
}
