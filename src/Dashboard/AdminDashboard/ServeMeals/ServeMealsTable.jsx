/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  MdVerified } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";


export default function ServeMealsTable({meal}) {
    const queryClient = useQueryClient();
    const { title, status, requester} = meal || {}
    const axiosSecure = useAxiosSecure();

    //handle delevered ====================
    const { mutateAsync } = useMutation({
        mutationFn: async ({ id ,statusInfo}) => {
          await axiosSecure.put(`/serve_meals/${id}`,statusInfo);
        },
        onSuccess: () => {
          toast.success("Meal Served Successfully.");
          queryClient.invalidateQueries({ queryKey: ["serve-meals"] });
        },
      });
    const handleDelivered = async (id) =>{
        const statusInfo ={
            status:'delivered'
        }
        await mutateAsync({id,statusInfo})
    }

  return (
    <>
        <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
        <td className="p-3">
          <p>{title}</p>
        </td>
        <td className="p-3">{/* <p>Microsoft Corporation</p> */}</td>
        <td className="p-3">{requester?.email}</td>
        <td className="p-3">{requester?.name}</td>
        <td className="p-3 ">
          <p
        className={`${
            status === "Pending"
              ? "bg-red-100/60 text-red-500"
              : "bg-emerald-100/60 text-emerald-500"
          } px-3 font-semibold  cursor-not-allowed py-1 w-fit   rounded-md`}
          >
            {status}
          </p>
        </td>
        <td className="p-3 ">
          <button
          onClick={()=> handleDelivered(meal?._id)}
            disabled={status === "delivered"}
            className={`text-teal-500 text-xl `}
          >
            <MdVerified />
          </button>
        </td>
      </tr>
    </>
  )
}
