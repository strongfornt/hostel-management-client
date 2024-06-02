import { Fade } from "react-awesome-reveal"
import bg1 from "../../../../assets/Review/shape-2.webp"
import bg2 from "../../../../assets/Review/shape-3.webp"
import Slider from "./Slider"

export default function Review() {
    
  return (
    <div className="flex  items-center justify-center">
  
  <div className=" absolute  -z-10 -left-6" >
            <img className=" " src={bg1} alt="" />
     </div>
     <div className=" absolute right-0  -z-10 " >
    <img  src={bg2} alt="" />
    </div>
  
    <div className="flex gap-10 flex-col px-2 md:px-4" >
        <div className=" text-center">
        <Fade direction="up" triggerOnce={true}>
        <p className="mt-2 font-mono text-2xl leading-6 text-gray-600">
            Get To Know Us
          </p>
        <h2 className="text-3xl font-extrabold text-[#4b5664] sm:text-5xl">
            What Our Residents<span className="text-[#3F72AF]"> Say!</span>
          </h2>
        
          <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
          Discover what our residents think about our meals and facilities.  Their feedback helps us improve and create a better experience for everyone.
          </p>
        </Fade>
        </div>
        <div className="">
        <Slider/>
        </div>
    </div>
  
    </div>
  )
}
