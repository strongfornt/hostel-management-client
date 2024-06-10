import { Helmet } from "react-helmet-async";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import UpPublicMealsCard from "./UpPublicMealsCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../shared/Spinner/Spinner";
import useLikeStatus from "../../hooks/useLikeStatus";

export default function UpcomingPublicMeals() {
  const { theme } = useAuth();
  const axiosPublic = useAxiosPublic()
  //use tanstack query for fetch data ============================
    const{data: mealsData = [], isLoading , refetch } = useQuery({
        queryKey:['upcoming_public_meals'],
        queryFn: async()=> {
                const {data} = await axiosPublic.get('/upcoming_public_meals');
                return data;
        }
    })
  //use tanstack query for fetch data end ============================

  const allMealsIds = mealsData?.map(ids => ids._id)
 
  // const {email} = user?.email || 'anonymous'
 const {likeStatus, likeRefetch} = useLikeStatus(allMealsIds);


  return (
    <>
      <Helmet>
        <title>DineEase | Upcoming</title>
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
          Upcoming <span className="text-[#3F72AF]">Meals</span>
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
            Upcoming-Meals
          </p>
          <span className="inline-flex w-full absolute bg-[#F7F7F7] translate-y-6 h-[1px]">
            {" "}
          </span>
        </div>
      </div>

      {/* main section start from here ================================= */}
      <section className="mt-4 px-2">
        <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          Discover Upcoming <span className="text-[#3F72AF]">Meals</span>
        </h1>
        <p className="text-sm text-center  max-w-screen-sm mx-auto text-[#4b5664] ">
          Stay ahead with our upcoming meals. Get a sneak peek of delicious
          dishes that are on their way. Browse through a variety of meals
          planned for future dates.
        </p>
      </section>
      {/* card start here======================= */}
           {isLoading ? <Spinner/> :  <section className="mb-10 mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-2 md:px-4" >
                {
                    mealsData?.map((meal,idx) => <UpPublicMealsCard key={idx} meal={meal} refetch={refetch} likeStatus={likeStatus} likeRefetch={likeRefetch} /> )
                }
            </section>}
    </>
  );
}
