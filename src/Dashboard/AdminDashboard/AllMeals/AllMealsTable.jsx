/* eslint-disable react/prop-types */
import { CiEdit } from "react-icons/ci";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import AllMealsForm from "./AllMealsForm";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

export default function AllMealsTable({ meal }) {
  const [upgradableMeal, setUpgradableMeal] = useState({});
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  // chakri ka function ===========================
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  // chakri ka function end ===========================

  //use mutation tanstack for update meals =====================
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, mealInfo }) => {
      await axiosPublic.put(`/allMeals/${id}`, { mealInfo });
   
    },
    onSuccess: () => {
      toast.success("Meals Updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["allMeals"] });
    },
  });
  //use mutation tanstack for update meals end =====================

  // update  the meal data ========================
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors, isSubmitted },
  } = useForm();

  const formSubmit = async (data) => {
    const {
      title,
      image,
      category,
      ingredients,
      price: priceStr,
      rating: ratingStr,
      time,
      description,
    } = data || {};
    const ingredientsItems = ingredients.split(",");
    const price = parseFloat(priceStr);
    const rating = parseFloat(ratingStr);
    const id = upgradableMeal?._id;
    const mealInfo = {
      title,
      images: image,
      category,
      ingredientsItems,
      price,
      rating,
      description,
      currentTime: time,
      likes: upgradableMeal?.likes,
      reviews: upgradableMeal?.reviews,
      status: upgradableMeal?.status,
      creator: {
        email: upgradableMeal?.creator?.email,
        name: upgradableMeal?.creator?.name,
      },
    };
    // console.log(mealInfo);
    await mutateAsync({ id, mealInfo });
    onClose();
  };
  // update  the meal data end ========================
  // use tanstack mutation for delete ==================================
  const { mutateAsync: deleteAsync } = useMutation({
    mutationFn: async ({ id}) => {
       await axiosPublic.delete(`/allMeals/${id}`);
     
    },
    onSuccess: () => {
      toast.success("Meals Deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["allMeals"] });
    },
  });
  const handleDelete = async (id) => {
        await deleteAsync({id})
  }
  // use tanstack mutation for delete end ==================================

  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
        <td className="p-3">
          <p>{meal?.title}</p>
        </td>
        <td className="p-3">
          <p>{meal?.creator?.name}</p>
        </td>
        <td className="p-3">
          <p>Total {meal?.reviews}</p>
        </td>
        <td className="p-3">
          <p>Total {meal?.likes}</p>
        </td>
        <td className="px-3 py-2 ">
          <button
            onClick={() => {
              setUpgradableMeal(meal);
              setOverlay(<OverlayOne />);
              onOpen();
            }}
            className="cursor-pointer"
          >
            <CiEdit className="text-emerald-500 text-lg" />
          </button>
        </td>
        <td className="px-3 py-2   ">
          <button 
            onClick={()=> handleDelete(meal?._id)}
            className="cursor pointer">
            <RiDeleteBin6Line className="text-pink-500 text-xl" />
          </button>
        </td>
        <td className="px-3 py-2 flex justify-end  items-center">
          <button className="cursor-pointer">
            <HiOutlineViewGridAdd className="text-indigo-500 text-xl" />
          </button>
        </td>
      </tr>

      {/* Modal related work ======================================== */}
      <Modal
        isCentered
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Update meal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(formSubmit)}>
              <AllMealsForm meal={upgradableMeal} register={register} />
              <ModalFooter>
                <button
                  type="submit"
                  className="bg-[#3F72AF] text-white px-2 py-1 rounded-md font-sans "
                >
                  Update Meal
                </button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/*    */}
    </>
  );
}
