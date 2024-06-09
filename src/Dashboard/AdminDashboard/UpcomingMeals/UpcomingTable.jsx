import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUpcoming,
} from "react-icons/md";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
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
import UpcomingMealForm from "./UpcomingMealForm";

// eslint-disable-next-line react/prop-types
export default function UpcomingTable({ meal }) {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [upcomingMeal, setUpcomingMeal] = useState({});
  const [message, setMessage] = useState("");
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
  const { title, creator, currentTime, likes } = meal || {};

  // post to mealCollection using mutation tanstack ==============================
  const { mutateAsync } = useMutation({
    mutationFn: async ({ _id, mealInfo }) => {
      await axiosPublic.post(`/meals/${_id}`, { mealInfo });
    
    },
    onSuccess: () => {
      toast.success(message);
      setUpcomingMeal({});
      queryClient.invalidateQueries({ queryKey: ["upcomingMeals"] });
    },
  });
  // post to mealCollection using mutation tanstack edn ==============================

  //publish the meal =================
  const handlePublish = async (specificMeal) => {
    const {
      title,
      images,
      category,
      ingredientsItems,
      price,
      rating,
      description,
      currentTime,
      likes,
      reviews,
      creator,
      _id,
    } = specificMeal || {};
    const mealInfo = {
      title,
      images,
      category,
      ingredientsItems,
      price,
      rating,
      description,
      currentTime,
      likes,
      reviews,
      status: "Available",
      creator: {
        email: creator?.email,
        name: creator?.name,
      },
    };
    // console.log(mealInfo);
    await mutateAsync({ _id, mealInfo });
  };
  //publish the meal =================

  // send to the upcoming status ========================================

  const handleUpcoming = async () => {
    const {
      title,
      images,
      category,
      ingredientsItems,
      price,
      rating,
      description,
      currentTime,
      likes,
      reviews,
      creator,
      _id,
    } = upcomingMeal || {};
    const mealInfo = {
      title,
      images,
      category,
      ingredientsItems,
      price,
      rating,
      description,
      currentTime,
      likes,
      reviews,
      status: "Upcoming",
      upcomingId: _id ,
      creator: {
        email: creator?.email,
        name: creator?.name,
      },
    };
    await mutateAsync({ _id, mealInfo });
  };

  // send to the upcoming status end ========================================

  return (
    <>
      <tr className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
        <td className="p-3">
          <p>{title}</p>
        </td>
        <td className="p-3">
          <p>{creator?.name}</p>
        </td>
        <td className="p-3">
          <p>{moment(currentTime, "MMMM DD, YYYY hh:mm:ss A").fromNow()}</p>
        </td>
        <td className="p-3">
          <p>Total {likes}</p>
        </td>
        <td className="px-3 py-2 ">
          <button
            onClick={() => {
              setMessage("Meal is now on the menu!");
              handlePublish(meal);
            }}
            className="cursor-pointer"
          >
            <MdOutlinePublishedWithChanges className="text-emerald-500 text-lg" />
          </button>
        </td>
        <td className="px-3 py-2   ">
          <button
            onClick={() => {
              setUpcomingMeal(meal);
              setOverlay(<OverlayOne />);
              onOpen();
            }}
            className="cursor-pointer"
          >
            <MdOutlineUpcoming className="text-pink-500 text-xl" />
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
          <ModalHeader>Add Upcoming meal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpcomingMealForm meal={upcomingMeal} />
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => {
                setMessage("Upcoming meal added!");
                handleUpcoming();
                onClose();
              }}
              className="bg-[#3F72AF] text-white px-2 py-1 rounded-md font-sans "
            >
              Add Upcoming Meal
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*    */}
    </>
  );
}
