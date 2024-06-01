import ReactStars from "react-rating-stars-component";
import food1 from "../../../../assets/Food/food1.jpg";

export default function MealsCard() {
  return (
    <>
      <div className=" overflow-hidden  rounded-lg shadow-lg bg-[#F9F7F7]">
        <div
          style={{ backgroundImage: `url(${food1})` }}
          className="object-cover bg-cover w-full h-48 rounded-t-lg"
        >
          {/* <img className="object-cover w-full h-48 mt-2" src={food1} alt="NIKE AIR" /> */}
          <div className="bg-black/25 h-full"></div>
        </div>
        <div className=" ">
        
           <div className="flex items-center justify-between px-1  bg-[#F9F7F7]">
           <ReactStars
            count={5}
            value={3}
            edit={false} // Set readonly
            size={24}
            activeColor="#ffd700"
          />
            <h1 className="text-lg font-bold text-[#4B5664]">$129</h1>
          </div>

          <div className="flex items-center justify-between px-1  bg-[#F9F7F7]">
            <h1 className="text-xl font-bold text-[#4b5664] uppercase ">
              NIKE AIR
            </h1>
            {/* <h1 className="text-lg font-bold text-[#4B5664]">$129</h1> */}
          </div>
        </div>

        <div className="flex items-center justify-between px-1 my-1 mb-2 bg-[#F9F7F7]">
          <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-[#3F72AF] rounded hover:bg-gray-200 hover:text-[#3F72AF] focus:bg-gray-400 focus:outline-none">
            Details
          </button>
        </div>
      </div>
    </>
  );
}
