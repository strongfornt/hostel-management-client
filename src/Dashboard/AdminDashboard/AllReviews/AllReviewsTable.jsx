/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdCancel } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function AllReviewTable({ meal }) {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { title, likes, reviews, mealId, _id } = meal || {};

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review Deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["all-reviews"] });
    },
  });

  const handleDelete = async (id) => {
    await mutateAsync({ id });
  };

  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
        <td className="p-3">
          <p>{title}</p>
        </td>
        <td className="p-3">Likes {likes}</td>
        <td className="p-3">
          {" "}
          <span>Reviews {reviews}</span>
        </td>
        <td className="p-3">
          {/* <button className="text-lg text-teal-500" ><RiEditLine /></button> */}
        </td>
        <td className="p-3 ">
          <button
            onClick={() => handleDelete(_id)}
            className={`text-red-500 text-xl cursor-pointer`}
          >
            <MdCancel />
          </button>
        </td>

        <td className="p-3 ">
          <Link
            to={`/mealsDetails/${mealId}`}
            className="bg-[#3F72AF] text-white px-2 py-1 rounded-md "
          >
            View Meal
          </Link>
        </td>
      </tr>
    </>
  );
}
