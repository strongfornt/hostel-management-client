import { FaRegCircleUser } from "react-icons/fa6";
import {
  
  IoFastFoodOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";
import { LuAlignVerticalDistributeEnd } from "react-icons/lu";
import { PiBowlFood } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  MdOutlineRateReview,
  MdOutlineReviews,
  MdOutlineUpcoming,
  MdPayment,
} from "react-icons/md";
import { SiReactrouter } from "react-icons/si";
import { IoIosGitPullRequest } from "react-icons/io";

import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

import useUserInfo from "../../hooks/useUserInfo";

export default function Dashboard() {
  const { userInfo, isUserLoading } = useUserInfo();
  const { user, logOut } = useAuth();

  //handle logout start =================================
  const handleLogout = () => {
    logOut().then(() => {
      toast("See you soon!");
    });
  };
  //handle logout end =================================
  if (isUserLoading) {
    return <div>Dashboard loading....</div>;
  }
  const { role } = userInfo || {};
  
  return (
    <>
      <div className={`min-h-screen p-3 space-y-2 w-60 dark:bg-[#DBE2EF] !overflow-y-auto dark:text-gray-800 `}>
        <div className="flex items-center p-2 space-x-4">
          <img
            src={user?.photoURL}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">{user?.displayName}</h2>
            <span className="flex items-center space-x-1">
              <Link
                to="/dashboard"
                className="text-xs hover:underline dark:text-gray-600"
              >
                View profile
              </Link>
            </span>
          </div>
        </div>
        <div className="divide-y dark:divide-gray-300">
          {/* admin route start ============================================= */}
          {role === "Admin" && (
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="dark:bg-gray-100 dark:text-gray-900">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current dark:text-gray-600"
                  >
                    <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                  </svg>
                  <span>Admin Dashboard</span>
                </a>
              </li>
              <li>
                <Link
                  to="/dashboard/manageUsers"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <FaRegCircleUser className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>Manage Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/addMeal"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <IoFastFoodOutline className="w-5 h-5 fill-current dark:text-gray-600" />

                  <span>Add Meal</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/allMeals"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <BiFoodMenu className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>All Meals</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/allReviews"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <MdOutlineReviews className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>All Reviews</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/serveMeals"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <LuAlignVerticalDistributeEnd className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>Serve Meals</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/upcomingMeals"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <MdOutlineUpcoming className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>Upcoming Meals</span>
                </Link>
              </li>
            </ul>
          )}
          {/* admin route end ============================================= */}

          {/* user route start ==================================================== */}
          {role === "User" && (
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="dark:bg-gray-100 dark:text-gray-900">
                <a className="flex items-center p-2 space-x-3 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current dark:text-gray-600"
                  >
                    <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                  </svg>
                  <span>User Dashboard</span>
                </a>
              </li>
              <li>
                <Link
                  to="/dashboard/requestedMeals"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <IoIosGitPullRequest className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>Requested Meals</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/myReviews"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <MdOutlineRateReview className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>My Reviews</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/paymentHistory"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <MdPayment className="w-5 h-5 fill-current dark:text-gray-600" />
                  <span>Payment History</span>
                </Link>
              </li>
            </ul>
          )}
          {/* user route end ==================================================== */}

          {/* for pages ========================== */}
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="dark:bg-gray-100 dark:text-gray-900">
              <a className="flex items-center p-2 space-x-3 rounded-md">
                <SiReactrouter className="w-5 h-5 fill-current dark:text-gray-600" />
                <span>Pages</span>
              </a>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <IoHomeOutline className="w-5 h-5 fill-current dark:text-gray-600" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/meals"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <PiBowlFood className="w-5 h-5 fill-current dark:text-gray-600" />
                <span>Meals</span>
              </Link>
            </li>
         
          </ul>
          {/* for pages ========================== */}
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-gray-600"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
