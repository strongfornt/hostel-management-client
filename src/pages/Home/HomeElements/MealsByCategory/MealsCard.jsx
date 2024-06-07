import ReactStars from "react-rating-stars-component";
import food1 from "../../../../assets/Food/food1.jpg";

// eslint-disable-next-line react/prop-types
export default function MealsCard({meal}) {
  const {images, price, rating, title } = meal || {}
  return (
    <>
      <div className=" overflow-hidden  rounded-lg shadow-lg bg-[#F9F7F7]">
        <div className="overflow-hidden">
        <div
          style={{ backgroundImage: `url(${images})` }}
          className="object-cover bg-cover w-full h-48 rounded-t-lg hover:scale-105 transition-all duration-300  "
        >
         
          
          <div className="bg-black/25 h-full">
            <div  className="bg-[#3F72AF] w-fit px-2 absolute translate-x-3 translate-y-3 rounded-sm " >
            <h1 className="text-lg font-bold text-white ">${price}</h1>  
            </div>
          </div>
        </div>
        </div>
        <div className=" ">
        <ReactStars
            count={5}
            value={rating}
            edit={false} // Set readonly
            size={24}
            activeColor="#ffd700"
          />
           

          <div className="flex items-center justify-between px-1  bg-[#F9F7F7]">
            <h1 className="text-xl font-bold text-[#4b5664] uppercase ">
                {title}
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
