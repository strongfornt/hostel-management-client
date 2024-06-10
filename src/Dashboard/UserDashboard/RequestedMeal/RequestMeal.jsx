import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import RequestMealsTable from "./RequestMealsTable";
import Spinner from "../../../shared/Spinner/Spinner";


export default function RequestMeal() {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();

    const {data: requestMealsData = [], isLoading} = useQuery({
        queryKey:['request_meals'],
        queryFn: async () => {
                const {data} = await axiosSecure.get(`/request_meals/${user?.email}`)
                return data;
        }
    })

  

  return (
 <>
    <Helmet>
        <title>DineEase | AllMeals</title>
      </Helmet>


    <section className=" my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44 " >
    <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          Requested  <span className="text-[#3F72AF]">Meals</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
          Manage your meal requests, view titles, likes, reviews, status, and cancel requests easily.
          </p>
        </div>

        <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
          <h2 className="mb-4 text-2xl  font-semibold leading-tight">Meals</h2>
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
                  <th className="p-3">Likes</th>
                  <th className="p-3">Reviews</th>
                  <th className="p-3 ">Status</th>

                  <th className="p-3">Cancel</th>
                </tr>
              </thead>
              <tbody>
                {
                   isLoading ? <Spinner/> :  requestMealsData?.map((meal,idx)=> <RequestMealsTable key={idx} meal={meal} /> )
                }
              </tbody>
            </table>
          </div>
        </div>

    </section>

 </>
  )
}
