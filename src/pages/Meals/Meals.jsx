import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import MealsCard from "./MealsCard";
import Spinner from "../../shared/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
export default function Meals() {
  const { theme } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

    console.log(priceRange);
// Parse the price range input ============================================
  // apply limit function with api ======================
  const getMeals = async ({ pageParam = 1 }) => {
    const limit = 4;
    const { data } = await axiosPublic(
      `/meals?limit=${limit}&offset=${pageParam}&category=${category}&price=${priceRange}&search=${search}`
    );
    return { ...data, prevOffset: pageParam };
  };
  // apply limit function with api end ======================

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["meals",category,priceRange,search],
    queryFn: getMeals,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 4 > lastPage.mealsCount) {
        return false;
      }
      return lastPage.prevOffset + 1;
    },
  });

//   console.log(data);
  const mealsData = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.result];
  }, []);
  // use tanstak for fetch data end ==========================
//   console.log(mealsData);
//   useEffect(() => {
//     fetchNextPage({ pageParam: 1 }); // Reset to the first page on filter change
//   }, [fetchNextPage,category,priceRange]);
console.log(search);
  
  return (
    <>
      <Helmet>
        <title>DineEase | Meals</title>
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
          Mea<span className="text-[#3F72AF]">ls</span>
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
            Meals
          </p>
          <span className="inline-flex w-full absolute bg-[#F7F7F7] translate-y-6 h-[1px]">
            {" "}
          </span>
        </div>
      </div>

      {/* main section start from there =================================== */}
      <div className="mt-4 px-2">
        <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          Find Your Perfect <span className="text-[#3F72AF]">Meal</span>
        </h1>
        <p className="text-sm text-center  max-w-screen-sm mx-auto text-[#4b5664] ">
          Explore a wide variety of meal options. Use our search and filter
          features to narrow down your choices and discover something new and
          delicious.
        </p>
        <div className="overflow-x-auto ">
          {/* search functionality start here==================== */}
          <div className="container px-2 w-fit mx-auto  flex items-center justify-center  gap-4 md:gap-8  lg:gap-10  py-5">
            {/* search by country start ============================ */}
            {/* filter by price range start ============================ */}
            <select
              onChange={(e) => {
                setCategory('')
                setPriceRange(e.target.value)
              }}
              defaultValue="default"
              className="px-4 py-1  border cursor-pointer ring-1 ring-[#3F72AF] outline-none rounded-md "
              name="category"
              id="category"
            >
              <option disabled value="default">
                Filter By Price Range
              </option>
              {/* <option value={4}>Less then $4</option> */}
              <option value={5}>Grater then $5</option>
              <option value={7}>Grater then $7</option>
            </select>
            
            {/* filter by price range end ============================ */}
            {/* search by country end ============================ */}
            {/* search by category start ============================ */}
            <select
              onChange={(e) => {
                setPriceRange('')
                setCategory(e.target.value)
              }}
              defaultValue="default"
              className="px-4 py-1  border cursor-pointer ring-1 ring-[#3F72AF] outline-none rounded-md "
              name="category"
              id="category"
            >
              <option disabled value="default">
                Filter By Category
              </option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            {/* search by category end ============================ */}
            {/* search by name start ============================ */}
            <div className="">
              <fieldset className="w-full space-y-1 dark:text-gray-800">
                <label htmlFor="Search" className="hidden">
                  Search
                </label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCategory('');
                    setPriceRange('')
                    const search = e.target.meals.value;
                    setSearch(search);
                    e.target.reset();
                  }}
                  className="relative"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                    
                      type="submit"
                      title="search"
                      className="p-1 focus:outline-none focus:ring"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 dark:text-gray-800"
                      >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="meals"
                    placeholder="Search here .."
                    className="py-[5px] pl-10 text-sm  focus:outline-none border cursor-pointer ring-1 ring-[#3F72AF]   outline-none rounded-md"
                  />
                </form>
              </fieldset>
            </div>
            {/* search by name end ============================ */}
            <div className="">
              <button
                onClick={() => {
                    setCategory('')
                    setPriceRange('')
                    setSearch('')
                }}
                className="px-4 py-1 bg-[#3F72AF] text-white rounded-md hover:bg-[#4a83c9] duration-300 font-medium"
              >
                Reset
              </button>
            </div>
          </div>
          {/* search functionality end here ============================ */}
        </div>
      </div>

      <InfiniteScroll
        dataLength={mealsData ? mealsData?.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<div>loading...</div>}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <section className="mb-10 mt-5 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 px-2 md:px-4">
            {mealsData?.map((meal, idx) => (
              <MealsCard key={idx} meal={meal} />
            ))}
          </section>
        )}
      </InfiniteScroll>
    </>
  );
}
