import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Styles.css";
import { useRef } from "react";

import { BsChatQuote } from "react-icons/bs";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

export default function Slider() {
  const axiosPublic = useAxiosPublic()
  const {data:review =[]} = useQuery({
    queryKey:['public-review'],
    queryFn: async() =>{
        const {data} = await axiosPublic.get('/all_review')
        return data;
    }
  })
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className=" container max-w-xs md:max-w-xl mx-auto lg:max-w-2xl xl:max-w-5xl overflow-hidden  py-2">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        slidesPerView={3} // Adjusted to show more slides
        spaceBetween={-30} // Reduce the space between slides
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        modules={[EffectCoverflow, Autoplay, Navigation]}
        className="mySwiper"
      >
        {review?.map((review, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide flex justify-center items-center"
          >
            <div className="   md:h-80 md:w-80 lg:h-96 xl:w-96 flex flex-col  bg-[#F9F7F7] rounded-lg shadow-lg">
              <div className="flex py-2 flex-col items-center justify-center gap-2 h-1/2">
                <BsChatQuote className=" text-2xl md:text-5xl text-[#3F72AF]" />
                <p className=" text-xs  md:text-sm   text-[#4b5664] text-center">
                {review?.reviewText}
                </p>
              </div>

              {/* identification part */}
              <div className=" flex py-5 md:py-0 flex-col gap-2 items-center justify-center h-1/2 bg-[#3F72AF]">
                {/* user name======================= */}

                <h1 className="text-white font-bold">{review?.reviewer?.name}</h1>

                {/* user name======================= */}
                {/* avatar ========================= */}
                <div className="avatar">
                  <div className="w-14  rounded-full ring-1 ring-white ring-offset-base-100 ring-offset-2 ">
                    <img src={review?.reviewer?.image} />
                  </div>
                </div>
                {/* avatar ========================= */}
              </div>
              {/* identification part */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center gap-6 mt-4">
        <button ref={prevRef} className="">
          <FaArrowAltCircleLeft className="text-[#3F72AF] text-xl" />
        </button>
        <button ref={nextRef} className="">
          <FaArrowAltCircleRight className="text-[#3F72AF] text-xl" />
        </button>
      </div>
    </div>
  );
}
