/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useAuth from "../../../../../hooks/useAuth";
import Swal from "sweetalert2";
import './../../../../styles/common.css';
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

export default function CheckoutForm({totalPrice}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure,totalPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    //confirm payment ================================
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    //confirm payment end==========================================
    if (confirmError) {
      console.log("confirmError", confirmError);
      Swal.fire({
        title: "Payment Failed!",
        text: "Unfortunately, your payment could not be processed. ",
        icon: "error",
      });
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
    //    swall message start======================x
    Swal.fire({
        title: "Payment Successful!",
        text: "Thank you for your purchase! ",
        icon: "success",
      });
    //    swall message start======================x
      
    //now save the payment in the database ============================
    // Define options for the date format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

      const payment = {
        name: user?.displayName,
        email: user?.email,
        price: totalPrice,
        date: new Date().toLocaleDateString('en-US', options),

      }
      const savePayment = async() => {
            const {data} = await axiosPublic.post('/')
      }
      navigate('/')
    //now save the payment in the database end ============================

      }
    }

    //==============
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {/* <button
          className=""
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button> */}
       <div className="w-fit mx-auto">
       <button
            type="submit"
            disabled={!stripe || !clientSecret}
         className="px-8 py-2 tracking-wide cursor-pointer text-white capitalize transition-colors duration-300 transform bg-[#3F72AF] rounded-md hover:bg-[#4b83c8] focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-80">
         Make Payment
              </button>
        <p className="text-red-800">{error}</p>
       </div>
      </form>
    </>
  );
}
