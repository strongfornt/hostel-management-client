import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Select from "react-select";
import { useEffect, useState } from "react";
import AllMealsTable from "./AllMealsTable";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

export default function AllMeals() {
  const axiosSecure = useAxiosSecure();
  const [itemPerPages, setItemPerPages] = useState(10);
    const [count,setCount] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    const axiosPublic = useAxiosPublic();
  const [selectedOption, setSelectedOption] = useState(null);
  // const [allMeals,setAllMeals] = useState([])

  //tanstack for fetching data start =======================================
  const { data: allMeals = [] } = useQuery({
    queryKey: ["allMeals", selectedOption,currentPage,itemPerPages],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/allMeals?sort=${selectedOption}&page=${currentPage}&size=${itemPerPages}`
      );
      return data;
    },
  });
           //count the total documents ============
           useEffect(()=>{
            const getCount = async() =>{
              const {data} = await axiosPublic.get(`/all_meals_count`)
             
              setCount(data?.allMealsCount)
            
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

  //tanstack for fetching data end =======================================

  //select option for the like and review ==================
  const options = [
    { value: "likes", label: "Total Likes" },
    { value: "reviews", label: "Total Reviews" },
  ];
  const handleChange = (option) => {
    setSelectedOption(option?.value);
  };
  //select option for the like and review ==================

  return (
    <>
      <Helmet>
        <title>DineEase | AllMeals</title>
      </Helmet>
      <section className=" my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44 ">
        <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
            Manage <span className="text-[#3F72AF]">Meals</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
            Effortlessly manage all meals in one place. View detailed
            information, update meal details, and ensure the quality of your
            offerings with ease.
          </p>
        </div>

        {/* main section start ====================================================== */}

        <div className="container p-2 mx-auto sm:p-4 text-gray-100 dark:text-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className=" text-2xl font-semibold leading-tight">All Meals</h2>
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
                  <th className="p-3">Reviews</th>
                  <th className="p-3">Likes</th>
                  <th className="p-3 ">Update</th>
                  <th className="p-3 ">Delete</th>
                  <th className="p-3 text-right  ">Details</th>
                </tr>
              </thead>
              <tbody>
                {allMeals?.map((meal, idx) => (
                  <AllMealsTable key={idx} meal={meal} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
       {/* main sectinend */}
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
