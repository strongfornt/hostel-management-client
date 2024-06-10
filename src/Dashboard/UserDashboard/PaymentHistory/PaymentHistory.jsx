import { Helmet } from "react-helmet-async";
import PaymentHistoryTable from "./PaymentHistoryTable";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../shared/Spinner/Spinner";
import NotFound from "../../../shared/NotFound/NotFound";

export default function PaymentHistory() {
    const {user} = useAuth();
    const axiosSecure =  useAxiosSecure();
    
    const {data: paymentData = [], isLoading} = useQuery({
        queryKey:['payment',user],
        queryFn: async () =>{
            const {data} = await axiosSecure.get(`/payment/${user?.email}`)
            return data
        }
    })

    
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
  </>
  )
}
