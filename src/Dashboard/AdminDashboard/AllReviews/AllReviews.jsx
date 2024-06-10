import { Helmet } from "react-helmet-async";
import NotFound from "../../../shared/NotFound/NotFound";
import Spinner from "../../../shared/Spinner/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AllReviewTable from "./AllReviewsTable";

export default function AllReviews() {
    
    const  axiosSecure = useAxiosSecure();
    const {data: allReviewsData= [] ,isLoading} = useQuery({
        queryKey:['all-reviews'],
        queryFn: async () =>{
            const {data} = await axiosSecure.get(`/all_reviews`)
            return data
        }
    })

    console.log(allReviewsData);
  return (
   <>
    <Helmet>
        <title>DineEase | AllReviews</title>
      </Helmet>
      <section className="my-7 md:my-10  md:ml-[15rem] lg:ml-1  xl:ml-44" >
      <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
          My  <span className="text-[#3F72AF]">Reviews</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
          View and manage your reviews in one place. Easily edit, delete, or view meals associated with your feedback, along with tracking likes on your reviews.
          </p>
        </div>

            {
                isLoading ? <Spinner/> : allReviewsData?.length === 0 ? <NotFound/> : <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
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
                        <th className="p-3">Likes</th>
                        <th className="p-3">Review</th>
                        <th className="p-3"></th>
                        <th className="p-3 ">Delete</th>
      
                        <th className="p-3">View meal</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        allReviewsData?.map((meal,idx)=> <AllReviewTable key={idx} meal={meal} /> )
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            }
      </section>
   </>
  )
}