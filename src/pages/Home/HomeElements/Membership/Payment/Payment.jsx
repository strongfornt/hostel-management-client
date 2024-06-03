import { Helmet } from "react-helmet-async/lib";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Lottie from "lottie-react";
import paymentPic from './payment.json'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY_PK);
export default function Payment() {
  const { theme } = useAuth();
  const {data} = useLoaderData();
  const {price:totalPrice,discount,description,header,label,benefits} = data || {};
  console.log(data);
  return (
    <>
      <Helmet>
        <title>DineEase | Payment</title>
      </Helmet>

      <div
        className={`${
          theme === "light" && "bg-[#F9F7F7]"
        } pt-24 pb-12 space-y-3`}
      >
        <h1
          className={`text-center text-3xl  md:text-4xl font-semibold ${
            theme === "light" && "text-[#4b5664]"
          }`}
        >
          Payme<span className="text-[#3F72AF]">nt</span>
        </h1>
        <div className="flex gap-1 justify-center items-center w-fit mx-auto  relative  ">
          <Link to="/">
            <p className={`${theme === "light" ? "text-black/65" : ""}`}>
              Homepage
            </p>
          </Link>

          <p
            className={`text-sm ${
              theme === "light" ? "text-black/45" : "text-white/55"
            } flex items-center`}
          >
            {" "}
            <p>
              <MdKeyboardArrowRight />
            </p>{" "}
            Payment
          </p>
          <span className="inline-flex w-full absolute bg-[#F7F7F7] translate-y-6 h-[1px]">
            {" "}
          </span>
        </div>
      </div>

      {/* main content================= */}
      <section className="flex ppx-2 md:px-4 flex-col justify-evenly lg:flex-row" >
        <div className="">
          <div className="container px-6 py-8 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-[#3F72AF] capitalize lg:text-3xl ">
            {header}
            </h1>

            <p className="max-w-2xl mx-auto mt-2 text-center   text-[#5c6470] ">
            {description}
            </p>

            <div className="grid grid-cols-1 mt-6 xl:mt-8">
           
              <div className="flex items-center justify-between px-8 py-4 border border-[#3F72AF] cursor-pointer rounded-xl">
                <div className="flex flex-col items-center space-y-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-[#3F72AF]  sm:h-7 sm:w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <h2 className="text-lg font-medium text-[#4b5664]  sm:text-xl ">
                   {label}
                  </h2>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <div className="px-2 text-xs text-white bg-[#4b5664] rounded-full  sm:px-4 sm:py-1  ">
                    Save {discount}
                  </div>

                  <h2 className="text-2xl font-semibold text-[#3F72AF]   sm:text-3xl">
                    ${totalPrice} <span className="text-base font-medium">/Monthly</span>
                  </h2>
                </div>
              </div>

            </div>

            <div className="p-5 mt-5 space-y-5 bg-[#F9F7F7] rounded-xl">
                {
                    benefits?.map((benefit,idx)=> <div key={idx} className="flex items-center justify-between text-[#4b5664]  ">
                    <p className="textlg sm:text-xl">{benefit}</p>
    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-blue-500 sm:h-7 sm:w-7"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>)
                }
              

           
            </div>

           
            <div className="max-w-sm mt-5 mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} />
          </Elements>
        </div>

          </div>
        </div>

        <div className=" hidden  lg:flex items-center justify-center" >
        <Lottie animationData={paymentPic} loop={true} />
        </div>

      
      </section>
    </>
  );
}
