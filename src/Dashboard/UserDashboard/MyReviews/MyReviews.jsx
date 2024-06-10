import { Helmet } from "react-helmet-async";
import MyReviewsTable from "./MyReviewsTable";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../shared/Spinner/Spinner";
import NotFound from "../../../shared/NotFound/NotFound";


export default function MyReviews() {
    const{ user} = useAuth();
    const  axiosSecure = useAxiosSecure();
    const {data: reviewsData= [] ,isLoading} = useQuery({
        queryKey:['review'],
        queryFn: async () =>{
            const {data} = await axiosSecure.get(`/reviews/${user?.email}`)
            return data
        }
    })
  return (
   <>
    <Helmet>
        <title>DineEase | My-Reviews</title>
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
                isLoading ? <Spinner/> : reviewsData?.length === 0 ? <NotFound/> : <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
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
                        <th className="p-3">Edit</th>
                        <th className="p-3 ">Delete</th>
      
                        <th className="p-3">View meal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        reviewsData?.map((meal,idx)=> <MyReviewsTable key={idx} meal={meal} /> )
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
