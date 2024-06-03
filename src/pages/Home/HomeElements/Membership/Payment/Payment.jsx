import { Helmet } from "react-helmet-async/lib";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY_PK)
export default function Payment() {
    const {theme} = useAuth()
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
            <section>
                <h2>Payment</h2>
                <div className="max-w-sm" >
                    <Elements stripe={stripePromise}>
                            <CheckoutForm/>
                    </Elements>
                </div>
            </section>

    </>
  )
}
