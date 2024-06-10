import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { MdKeyboardArrowRight } from "react-icons/md";

import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Spinner from "../../shared/Spinner/Spinner";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import useLikeStatus from "../../hooks/useLikeStatus";
import useUserInfo from "../../hooks/useUserInfo";
import { useForm } from "react-hook-form";
// import useUserInfo from "../../hooks/useUserInfo";

export default function MealsDetails() {
  const { theme, user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { userInfo } = useUserInfo();
  const { id } = useParams();
  const { likeStatus, likeRefetch } = useLikeStatus(id);

  const isLiked = (mealId) => {
    return likeStatus[mealId] === true;
  };

  // use query from tanstack for fetch data =======
  const {
    data: mealDetails = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["meal-details"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/meal-details/${id}`);
      return data;
    },
  });

  // handle like topic ========================================================
  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to interact with our upcoming meals!");
      return;
    }
    if (userInfo?.role === "User" && userInfo?.badge === "Bronze") {
      toast.error(
        "Upgrade to a premium subscription to like our upcoming meals!"
      );
      return;
    }
    //action for upcoming meals start ================================
    if (mealDetails?.status === "Upcoming") {
      const likesInfo = {
        email: user?.email,
        upcomingId: mealDetails?.upcomingId,
        status: mealDetails?.status,
      };
      const { data } = await axiosPublic.post(
        `/likes/${mealDetails?._id}`,
        likesInfo
      );
      if (data && data.totalLikes >= 10) {
        likeRefetch();
        refetch();
      } else if (data) {
        likeRefetch();
      }
      return;
    }
    //action for upcoming meals end ================================

    //action for the available status=======================
    const likesInfo = {
      email: user?.email,
    };
    const { data } = await axiosPublic.post(
      `/likes_available_meals/${mealDetails?._id}`,
      likesInfo
    );

    if (data) {
      likeRefetch();
    }
    //action for the available status end ======================
  };
  // handle like topic end ========================================================
  // handle meals request =======================================================
  const handleMealRequest = async () => {
    if (!user) {
      toast.error("Oops! You need to be logged in to request a meal!");
      return;
    }
    if (userInfo?.role === "User" && userInfo?.badge === "Bronze") {
      toast.error(
        "Subscription Required!Upgrade your plan to enjoy this feature."
      );
      return;
    }
    if (userInfo?.role === "Admin") {
      toast.error("Request Denied! Admins cannot request their own meals!");
      return;
    }
    if (mealDetails?.status === "Upcoming") {
      toast.error(
        "Request Unavailable! You cannot request meals that are marked as upcoming."
      );
      return;
    }

    //validation  end==========================================
    // request for meal start =============================================
    const requestMealInfo = {
      mealId: mealDetails?._id,
      title: mealDetails?.title,
      likes: mealDetails?.likes,
      reviews: mealDetails?.reviews,
      status: "Pending",
      requester: {
        email: user?.email || "Anonymous",
        name: user?.displayName || "Anonymous",
      },
    };

    // console.log(requestMealInfo);
    const { data } = await axiosPublic.post("/request_meals", requestMealInfo);
    
    if (data.insertedId) {
      toast.success(
        "Request Submitted! Your meal request is pending approval. Thank you!"
      );
    }
  };
  // handle meals request end =======================================================

  //handle review start here =========================================
  const { register, 
    handleSubmit,
     reset,
     formState:{errors} } = useForm();
  const formSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to submit a review!");
      return;
    }
    if (userInfo?.role === "Admin") {
      toast.error("Admins cannot submit reviews for their own meals!");
      return;
    }
    if(mealDetails?.status === 'Upcoming'){
      toast.error('You cannot submit a review for an upcoming meal!')
      return
    }
    
    const reviewsData = {
      mealId: mealDetails?._id,
      title: mealDetails?.title,
      likes: mealDetails?.likes,
      reviews: mealDetails?.reviews,
      reviewText: data?.reviews,
      reviewer: {
          email: user?.email || 'Anonymous',
          name:  user?.displayName || 'Anonymous',
          image: user?.photoURL
      }
    }
  

    //post reviews data in collection ==========================
    const res = await axiosPublic.post(`/reviews/${mealDetails?._id}`,reviewsData)
      if(res?.data?.insertedId){
        toast.success('Thanks for sharing your review!')
        reset()
      }
  

  };
  //handle review start end here =========================================
  //others topic---------------------------------------------------

  if (isLoading) {
    return <Spinner />;
  }

  const {
    images,
    category,
    title,
    price,
    description,
    status,
    rating,
    ingredientsItems,
    currentTime,
    creator,
  } = mealDetails || {};

  return (
    <>
      <Helmet>
        <title>DineEase | MealsDetails</title>
      </Helmet>

      <div
        className={`${
          theme === "light" && "bg-[#F7F7F7]"
        } pt-20 pb-6 space-y-1 `}
      >
        <h1
          className={`text-center text-xl  md:text-2xl font-semibold ${
            theme === "light" && "text-[#4b5664]"
          }`}
        >
          Meals Details
        </h1>

        <div className="flex gap-1 justify-center items-center w-fit mx-auto  relative  ">
          <Link to="/">
            <p
              className={` ${
                theme === "light" ? "text-black/45" : "text-white/55"
              }`}
            >
              Homepage
            </p>
          </Link>
          <p
            className={`text-sm ${
              theme === "light" ? "text-black/75" : ""
            } flex items-center`}
          >
            {" "}
            <p>
              <MdKeyboardArrowRight />
            </p>{" "}
            Meals-Details
          </p>
          <span className="inline-flex w-full absolute bg-[#F7F7F7] translate-y-6 h-[1px]">
            {" "}
          </span>
        </div>
      </div>

      <div
        data-aos="zoom-in"
        data-aos-delay="1000 "
        data-aos-duration="1000"
        className="px-4 md:px-8 lg:px-10"
      >
        <section className="  ">
          <div className="container flex flex-col-reverse justify-center  my-6 md:my-8  mx-auto  lg:mt-8 lg:mb-16 lg:flex-row-reverse lg:justify-between xl:justify-evenly ">
            <div className="flex flex-col justify-center text-start rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
              <div className="flex items-baseline   gap-4 ">
                <h1
                  data-aos="zoom-in"
                  data-aos-delay="1200 "
                  data-aos-duration="1200"
                  className={`text-2xl font-bold leading-none sm:text-3xl ${
                    theme === "light" ? "text-[#383737] " : "text-white"
                  }`}
                >
                  {title}
                </h1>
                <div>
                  {isLiked(id) ? (
                    <button onClick={handleLike}>
                      <BiSolidLike className="text-[#3F72AF] text-lg" />
                    </button>
                  ) : (
                    <button onClick={handleLike} className="text-lg">
                      <AiOutlineLike />
                    </button>
                  )}
                </div>
              </div>

              {/* rating and price */}
              <div>
                <ReactStars
                  count={5}
                  value={rating || 2}
                  edit={false} // Set readonly
                  size={24}
                  isHalf={true}
                  activeColor="#ffd700"
                />
                <div className="flex items-baseline gap-2">
                  <p className="flex items-center gap-1 mt-1 ">
                    {/* <CiCalendarDate className="text-2xl" /> */}
                    <span className={` font-semibold text-[#4b5664] `}>
                      Distributor - {creator?.name} .
                    </span>
                  </p>
                  <p className="text-xs font-sans text-[#4b5664] ">
                    {moment(currentTime, "MMMM DD, YYYY hh:mm:ss A").fromNow()}
                  </p>
                </div>
              </div>

              <div className="space-x-4  sm:space-x-6 my-2 ">
                <button
                  data-aos="zoom-in-right"
                  data-aos-delay="1600 "
                  data-aos-duration="1600"
                  className="px-4 py-1 bg-emerald-100/60 text-emerald-500 rounded-md  font-semibold"
                >
                  Category - <span className=" ">{category}</span>
                </button>
                <button
                  data-aos="zoom-in-right"
                  data-aos-delay="2000 "
                  data-aos-duration="2000"
                  className="px-4 py-1  rounded-md  bg-red-100/60 text-red-500 font-semibold"
                >
                  Price - ${price}
                </button>
              </div>
              <div></div>
              <p
                data-aos="zoom-in-right"
                data-aos-delay="2200 "
                data-aos-duration="2200"
                className="mt-1 mb-1 text-base text-[#968f8f]   "
              >
                <span
                  className={` font-semibold ${
                    theme === "light" ? "text-[#383737] " : "text-white"
                  }`}
                >
                  Description
                </span>{" "}
                - {description}
              </p>

              {/* ingredientsItems start======================= */}
              <div className=" flex justify-between    ">
                <ul className=" mb-3 text-xs text-[#968f8f] sm:mb-3 list-disc ">
                  <span
                    className={` font-semibold text-base ${
                      theme === "light" ? "text-[#383737] " : "text-white"
                    }`}
                  >
                    Ingredients
                  </span>{" "}
                  -{" "}
                  {ingredientsItems?.map((item, idx) => (
                    <li key={idx} className="ml-7">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <button
                    onClick={handleMealRequest}
                    className="px-2 py-1 bg-[#3F72AF] text-white rounded-md hover:bg-[#477dc1] duration-300 font-medium"
                  >
                    Request Meal
                  </button>

                  {/* modal end================================= */}
                </div>
              </div>

              {/* review section start ====================== */}
              <form onSubmit={handleSubmit(formSubmit)}>
                {/* <h1 className="text-[#383737] font-semibold text-base " > Share Your Experience:</h1> */}
                <label
                  htmlFor="reviews"
                  className="block text-sm text-[#383737] font-semibold "
                >
                  Share Your Experience:{" "}
                  <span className="text-xs text-[#4b5664] ml-3">50/100</span>
                </label>
                <textarea
                  required
                  {...register("reviews", {
                    minLength: {
                      value: 50,
                      message: "Review must be at least 50 characters long.",
                    },
                    maxLength: {
                      value: 150,
                      message: "Review must not exceed 150 characters.",
                    },
                  })}
                  type="text"
                  name="reviews"
                  id="reviews"
                  placeholder="write your opinion here .."
                  className="w-full px-3 py-2 border outline-none rounded-md bg-transparent border-gray-300 focus:ring-1 focus:ring-[#3F72AF]"
                />
                        {errors.reviews && <p style={{ color: 'red' }}>{errors.reviews.message}</p>}

                <button
                  type="submit"
                  className="px-2 py-1 bg-[#425b79] text-white rounded-md hover:bg-[#477dc1] duration-300 font-medium"
                >
                  Submit
                </button>
              </form>
              {/* review section start ====================== */}
            </div>
            <div className="flex  relative items-center lg:px-6 xl:px-0   justify-center rounded-xl  mb-5  lg:mt-0 h-80 sm:h-80 lg:h-80 xl:h-112 2xl:h-128">
              <div className="absolute bg-gray-900/75 text-white text-lg font-semibold px-3 py-2 rounded-md ">
                <p>{status}</p>
              </div>
              <img
                src={images}
                alt=""
                className=" sm:object-cover   lg:object-cover w-full  rounded-xl h-72 sm:h-80 lg:h-full xl:h-112 2xl:h-128"
              />
            </div>
          </div>
        </section>
      </div>

      <div></div>
    </>
  );
}
