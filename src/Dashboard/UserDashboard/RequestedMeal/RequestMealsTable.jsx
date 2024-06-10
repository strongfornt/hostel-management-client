/* eslint-disable react/prop-types */
import { MdCancel } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function RequestMealsTable({ meal }) {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure()
  const { title, likes, reviews, status,_id } = meal || {};

   //use tanstack Mutation for update users role ================
   const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      await axiosSecure.delete(`/request_meals/${id}`);
    },
    onSuccess: () => {
      toast.success("Your meal request has been successfully canceled.");
      queryClient.invalidateQueries({ queryKey: ["request_meals"] });
    },
  });
  //and a helper function =====================
  const handleCancel = async  (id) => {
    
    await mutateAsync({ id });
  };
  //use tanstack Mutation for update users role ================


  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
        <td className="p-3">
          <p>{title}</p>
        </td>
        <td className="p-3">{/* <p>Microsoft Corporation</p> */}</td>
        <td className="p-3">Likes {likes}</td>
        <td className="p-3">Reviews {reviews}</td>
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
          onClick={()=> handleCancel(_id)}
            disabled={status === "delivered"}
            className={`text-red-500 text-xl ${status === "delivered" ? 'cursor-not-allowed' :'cursor-pointer'}`}
          >
            <MdCancel />
          </button>
        </td>
      </tr>
    </>
  );
}
