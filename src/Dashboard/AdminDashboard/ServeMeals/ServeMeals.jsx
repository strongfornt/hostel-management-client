import { Helmet } from "react-helmet-async";
import ServeMealsTable from "./ServeMealsTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../shared/Spinner/Spinner";
import NotFound from "../../../shared/NotFound/NotFound";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


export default function ServeMeals() {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [search,setSearch] = useState('');
    const [itemPerPages, setItemPerPages] = useState(10);
    const [count,setCount] = useState(0);
    const [currentPage,setCurrentPage] = useState(1);
    const {data: serveMeals = [] ,isLoading} = useQuery({
        queryKey: ['serve-meals',search,currentPage,itemPerPages],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/serve_meals?search=${search}&page=${currentPage}&size=${itemPerPages}`)
            return data
        }
    })

     //count the total documents ============
  useEffect(()=>{
    const getCount = async() =>{
      const {data} = await axiosPublic.get(`/serve_meals_count?search=${search}`)
      setCount(data?.countServeMeals)
    
    }
    getCount()
  },[axiosPublic,search])
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

  return (
    <>
        <Helmet>
        <title>DineEase | Serve-Meals</title>
      </Helmet>

        <section className="my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44" >
        <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          Meal Service  <span className="text-[#3F72AF]">Management</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
          Oversee and fulfill meal requests with ease. Search for requests by username or email and update their status to Delivered when served.
          </p>
        </div>
       <div className="flex justify-end" >
       <div className=" ">
              <fieldset className="w-full space-y-1 dark:text-gray-800">
                <label htmlFor="Search" className="hidden">
                  Search
                </label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSearch(e.target.info.value)
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
                    name="info"
                    placeholder="Search by user info .."
                    className="py-[5px] pl-10 text-sm  focus:outline-none border cursor-pointer ring-1 ring-[#3F72AF]   outline-none rounded-md"
                  />
                </form>
              </fieldset>
            </div>
       </div>

       {
        isLoading ? <Spinner/> : serveMeals?.length === 0 ? <NotFound/> :  <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
        <h2 className="mb-4 text-2xl  font-semibold leading-tight"></h2>
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
                <th className="p-3"></th>
                <th className="p-3">Requester/mail</th>
                <th className="p-3">Name</th>
                <th className="p-3 ">Status</th>

                <th className="p-3">Serve</th>
              </tr>
            </thead>
            <tbody>
                {
                    serveMeals?.map((meal,idx) =>  <ServeMealsTable key={idx} meal={meal} />)
                }
            </tbody>
          </table>
        </div>
      </div>
       }

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
  )
}
