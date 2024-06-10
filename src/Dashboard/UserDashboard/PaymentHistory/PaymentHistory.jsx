import { Helmet } from "react-helmet-async";
import PaymentHistoryTable from "./PaymentHistoryTable";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../shared/Spinner/Spinner";
import NotFound from "../../../shared/NotFound/NotFound";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

export default function PaymentHistory() {
    const {user} = useAuth();
    const axiosSecure =  useAxiosSecure();
    const axiosPublic = useAxiosPublic();
  const [itemPerPages, setItemPerPages] = useState(10);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
    const {data: paymentData = [], isLoading} = useQuery({
        queryKey:['payment',user,currentPage, itemPerPages],
        queryFn: async () =>{
            const {data} = await axiosSecure.get(`/payment/${user?.email}?page=${currentPage}&size=${itemPerPages}`)
            return data
        }
    })

    //count the total documents ============
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosPublic.get(
        `/payment_count/${user?.email}`
      );
      setCount(data?.paymentCount);
    };
    getCount();
  }, [axiosPublic, user?.email]);
  const numberOfPages = Math.ceil(count / itemPerPages);
  const paginationCount = [...Array(numberOfPages).keys()].map((c) => c + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < paginationCount?.length) {
      setCurrentPage(currentPage + 1);
    }
  };
    
  return (
  <>
    <Helmet>
        <title>DineEase | Payment-History</title>
      </Helmet>

      <section   className=" my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44 " >
      <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          Payment <span className="text-[#3F72AF]">History  </span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
          Review all your past transactions and payments made on your account. Keep track of your spending and payment details effortlessly.
          </p>
        </div>

        {
            isLoading ?  <Spinner/> : paymentData?.length === 0? <> <NotFound/> </> :  <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
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
                    <th className="p-3">Date</th>
                    <th className="p-3"></th>
                    <th className="p-3">TransactionId</th>
                    <th className="p-3"></th>
                    <th className="p-3 ">Badge</th>
  
                    <th className="p-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                 {
                     paymentData?.map((payment,idx)=>  <PaymentHistoryTable key={idx} payment={payment} />)
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
          {paginationCount?.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-current="page"
              className={`inline-flex items-center px-4 py-2  text-sm font-semibold border ${
                currentPage === c ? "bg-teal-400 text-white" : "text-black"
              } 
           dark:border-gray-300`}
              onClick={() => setCurrentPage(c)}
            >
              {c}
            </button>
          ))}

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
