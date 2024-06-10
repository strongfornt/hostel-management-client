import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UpcomingTable from "./UpcomingTable";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

export default function UpcomingMeals() {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [itemPerPages,setItemPerPages] = useState(10);
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  //use tanstack for fetching data ==============================
  const { data: mealsData = [] } = useQuery({
    queryKey: ["upcomingMeals", selectedOption,currentPage,itemPerPages],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/upcomingMeals?likes=${selectedOption}$page=${currentPage}&size=${itemPerPages}`
      );
      return data;
    },
  });
  //count the total documents ============
  useEffect(()=>{
    const getCount = async() =>{
      const {data} = await axiosPublic.get(`/upcoming_meals_count`)
      setCount(data?.upcomingMealsCount)
    }
    getCount()
  },[axiosPublic])
  const numberOfPages = Math.ceil(count / itemPerPages);
  const paginationCount = [
    ...Array(numberOfPages)
      .keys()
  ].map(c => c+1);
  const handlePrev =() =>{
    if(currentPage > 1){
        setCurrentPage(currentPage -1)
        
    }
    
}
const handleNext = () =>{
     if(currentPage < paginationCount?.length){
        setCurrentPage(currentPage +1) 
     }
}
  //count the documents end ==========================
  //use tanstack for fetching data end ==============================

  //select option for the like and review ==================
  const options = [{ value: "likes", label: "Total Likes" }];
  const handleChange = (option) => {
    setSelectedOption(option?.value);
  };
  //select option for the like and review ==================
  return (
    <>
      <Helmet>
        <title>DineEase | UpcomingMeals</title>
      </Helmet>

      <section className="my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44">
        <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
            Next on the <span className="text-[#3F72AF]">Menu</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
            Stay informed about the delicious meals coming your way. Explore
            what our chefs are preparing for the near future.
          </p>
        </div>

        {/* main section start here =============================== */}
        <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className=" text-2xl font-semibold leading-tight">
              Meal Preview
            </h2>
            <div className="flex items-center gap-5">
              <div className="  ">
                <button
                  onClick={() => {
                    setSelectedOption(null);
                  }}
                  className="px-4 py-1 bg-[#3F72AF] text-white rounded-md hover:bg-[#4b8bd9] duration-300 font-medium"
                >
                  Reset
                </button>
              </div>
              <Select
                // value={selectedOption}
                defaultValue={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Sort By"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="bg-gray-700 dark:bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Distributor</th>
                  <th className="p-3">Post Time</th>
                  <th className="p-3">Likes</th>
                  <th className="p-3 ">Publish</th>
                  <th className="p-3 ">Upcoming</th>
                </tr>
              </thead>
              <tbody>
                {mealsData?.map((meal, idx) => (
                  <UpcomingTable key={idx} meal={meal} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* main section end ============================= */}
      <div className="mb-6 mt-6 flex items-center  justify-center">
       
       <nav
         aria-label="Pagination"
         className="inline-flex -space-x-px bg-gray-50  rounded-md shadow-sm"
       >
         <button
         onClick={handlePrev}
           type="button"
           className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300"
         >
           <span className="sr-only">Previous</span>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true"
             className="w-5 h-5 text-black"
           >
             <path
               fillRule="evenodd"
               d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
               clipRule="evenodd"
             ></path>
           </svg>
         </button>
      {
       paginationCount?.map((c,i)=>  <button
          key={i}
           type="button"
           aria-current="page"
           className={`inline-flex items-center px-4 py-2  text-sm font-semibold border ${currentPage === c ?'bg-teal-400 text-white':'text-black'   } 
           dark:border-gray-300`}
           
           
           onClick={()=> setCurrentPage(c)}
         >
           {c}
         </button>
       )
      }

         <button
         onClick={handleNext}
           type="button"
           className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-300"
         >
           <span className="sr-only">Next</span>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true"
             className="w-5 h-5 text-black "
           >
             <path
               fillRule="evenodd"
               d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
               clipRule="evenodd"
             ></path>
           </svg>
         </button>
       </nav>
       
     </div>
    </>
  );
}
