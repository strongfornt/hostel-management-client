// import PropagateLoader from "react-spinners/PropagateLoader";

import Lottie from "lottie-react";
import loader from "./spinner.json"

export default function Spinner() {
  return (
    <>
      <div className="flex item-center justify-center ">
      <div className="min-h-[100vh]  flex items-center justify-center" >
      {/* <PropagateLoader color="#66CCCC" />   */}
      <div className="max-w-sm" >
      <Lottie animationData={loader} />
      </div>
      </div>
      </div>
    </>
  )
}