/* eslint-disable react/prop-types */
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function UpPublicMealsCard({
  meal,
  refetch,
  likeStatus,
  likeRefetch,
}) {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { userInfo } = useUserInfo();
  const isLiked = (mealId) => {
    return likeStatus[mealId] === true;
  };
  //handle like =============================
  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to interact with our upcoming meals!");
      return;
    }
    if (userInfo?.role === "User" && userInfo?.badge === "Bronze") {
      toast.error(
        "Upgrade to a premium subscription to like our upcoming meals!"
      );
      return;
    }

    const likesInfo = {
      email: user?.email,
      upcomingId: meal?.upcomingId,
    };
    const { data } = await axiosPublic.post(`/likes/${meal?._id}`, likesInfo);

    if (data && data.totalLikes >= 10) {
      likeRefetch();
      refetch();
    } else if (data) {
      // setLike(data.message)
      likeRefetch();
    }
  };

  //handle like end =============================

  return (
    <>
      <div className=" overflow-hidden  rounded-lg shadow-lg bg-[#F9F7F7]">
        <div className="overflow-hidden">
          <div
            style={{ backgroundImage: `url(${meal?.images})` }}
            className="object-cover bg-cover w-full h-48 rounded-t-lg hover:scale-105 transition-all duration-300  "
          >
            <div className="bg-black/25 h-full">
              <h1 className="bg-[#4b5664] px-2 py-1 text-white w-fit translate-x-3 translate-y-3 font-mono rounded-md">
                {meal?.status}
              </h1>
            </div>
          </div>
        </div>
        <div className=" ">
          <div className=" px-1 my-1 bg-[#F9F7F7]">
            <h1 className="text-xl font-bold text-[#4b5664]  ">
              {meal?.title}
            </h1>

            <div className="flex items-center justify-between    bg-[#F9F7F7]">
              <h1 className="text-lg font-serif text-[#3F72AF]">
                {meal?.category}
              </h1>
              <h1 className="text-lg font-mono text-[#4B5664]">
                ${meal?.price}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-1  mb-2 bg-[#F9F7F7]">
          {isLiked(meal?._id) ? (
            <button
              onClick={() => {
                handleLike();
                // setLike(true)
              }}
            >
              <BiSolidLike className="text-[#3F72AF]" />
            </button>
          ) : (
            <button
              onClick={() => {
                handleLike();
                // setLike(false)
              }}
            >
              <AiOutlineLike />
            </button>
          )}
          <Link
            to={`/mealsDetails/${meal?._id}`}
            className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-[#3F72AF] rounded hover:bg-gray-200 hover:text-[#3F72AF] focus:bg-gray-400 focus:outline-none"
          >
            Details
          </Link>
        </div>
      </div>
    </>
  );
}
