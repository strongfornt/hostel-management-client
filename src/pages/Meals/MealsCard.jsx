/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function MealsCard({ meal }) {
  const { images, category, title, price, description, status , _id } = meal || {};
  return (
    <>
      <div className=" overflow-hidden  rounded-lg shadow-lg bg-[#F9F7F7]">
        <div className="overflow-hidden">
          <div
            style={{ backgroundImage: `url(${images})` }}
            className="object-cover bg-cover w-full h-48 rounded-t-lg hover:scale-105 transition-all duration-300  "
          >
            <div className="bg-black/25 h-full">
              <h1 className="bg-[#4b5664] px-2 py-1 text-white w-fit translate-x-3 translate-y-3 font-mono rounded-md">
                {status}
              </h1>
            </div>
          </div>
        </div>
        <div className=" ">
          <div className=" px-1 my-1 bg-[#F9F7F7]">
            <h1 className="text-xl font-bold text-[#4b5664]  ">
              {title}
            </h1>

            <div className="flex items-center justify-between    bg-[#F9F7F7]">
          <h1 className="text-lg font-serif text-[#3F72AF]">{category}</h1>
          <h1 className="text-lg font-mono text-[#4B5664]">${price}</h1>
          
        </div> 
            <p className="text-[#4b5664] text-sm">
             {description.slice(0,70)}...
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-1  mb-2 bg-[#F9F7F7]">
          
          <Link to={`/mealsDetails/${_id}`} className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-[#3F72AF] rounded hover:bg-gray-200 hover:text-[#3F72AF] focus:bg-gray-400 focus:outline-none">
            Details
          </Link>
        </div>
      </div>
    </>
  );
}
