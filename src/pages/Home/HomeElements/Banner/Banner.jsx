import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
// import 'swiper/css/navigation';
import "./style.css";
import { Pagination, Autoplay, Navigation, Keyboard } from "swiper/modules";
import { Fade } from "react-awesome-reveal";
// import slide1 from './../../assets/house/VacationRentals2.jpg'
export default function Banner() {
  let swiperInstance = null;

  const handleFocus = () => {
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.stop();
    }
  };

  const handleBlur = () => {
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.start();
    }
  };
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#3F72AF",
          "--swiper-navigation-size": "35px", // Adjust navigation size
        }}
        navigation={{
          clickable: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
        }}
        keyboard={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={500}
        modules={[Pagination, Autoplay, Navigation, Keyboard]}
        className=" w-full"
        onSwiper={(swiper) => (swiperInstance = swiper)}
      >
        <SwiperSlide className="">
          <div
            
            className=" slide slide1  h-[100vh]  md:h-[100vh]    "
          >
            <div className="w-full bg-black/45   h-full flex items-center justify-center ">
              <div className="text-white space-y-4">
                <Fade
                  direction="up"
                  delay={200}
                  triggerOnce={true}
                  cascade={false}
                >
                  <h1 className=" text-3xl md:text-4xl  lg:text-5xl font-bold text-white text-center">
                    Welcome to
                    <span className="text-[#3F72AF] "> DineEase!</span>
                  </h1>
                  <p className=" text-sm md:text-base lg:text-lg font-bold text-white max-w-screen-md text-center px-2 ">
                    Experience the future of hostel living with intuitive meal
                    management and real-time reviews. Simplify your stay with
                    our innovative platform.
                  </p>

                  {/* search input start=================================== */}
                 <div className="flex justify-center" >
                 <div className="  ">
                    <fieldset className="w-full space-y-1 dark:text-white">
                      <label htmlFor="Search" className="hidden">
                        Search
                      </label>
                      <div
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <button
                            type=""
                            title="search"
                            className="p-1 focus:outline-none focus:ring"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 512 512"
                              className="w-4 h-4 text-white"
                            >
                              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                          </button>
                        </span>
                        <input
                          type="search"
                          name="recipe"
                          placeholder="Search here "
                          className="py-[5px] pl-10 text-sm bg-transparent focus:outline-none border cursor-pointer ring-1 ring-[#3F72AF] outline-none rounded-md"
                        />
                      </div>
                    </fieldset>
                
                  </div>
                 </div>
                   {/* search input enn=================================== */}
                </Fade>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="">
          <div className=" slide slide2   h-[100vh] md:h-[100vh]        ">
            <div className="w-full bg-black/70   h-full flex items-center justify-center ">
              <div className="text-white space-y-4">
                <Fade
                  direction="up"
                  delay={200}
                  cascade={false}
                  triggerOnce={true}
                >
                  <h1 className=" text-3xl md:text-4xl  lg:text-5xl font-bold text-white text-center">
                    Effortless
                    <span className="text-[#3F72AF]"> Dining!</span>
                  </h1>
                  <p className=" text-sm md:text-base lg:text-lg font-bold text-white max-w-screen-md text-center">
                    Administrators can easily plan, manage, and update daily
                    meal schedules. Students enjoy hassle-free dining with
                    comprehensive meal information at their fingertips.
                  </p>
                   {/* search input start=================================== */}
                 <div className="flex justify-center" >
                 <div className="  ">
                    <fieldset className="w-full space-y-1 dark:text-white">
                      <label htmlFor="Search" className="hidden">
                        Search
                      </label>
                      <div
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <button
                            type=""
                            title="search"
                            className="p-1 focus:outline-none focus:ring"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 512 512"
                              className="w-4 h-4 text-white"
                            >
                              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                          </button>
                        </span>
                        <input
                          type="search"
                          name="recipe"
                          placeholder="Search here "
                          className="py-[5px] pl-10 text-sm bg-transparent focus:outline-none border cursor-pointer ring-1 ring-[#3F72AF] outline-none rounded-md"
                        />
                      </div>
                    </fieldset>
                
                  </div>
                 </div>
                   {/* search input enn=================================== */}
                </Fade>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="">
          <div className=" slide slide3    h-[100vh]  md:h-[100vh]    ">
            <div className="w-full bg-black/65   h-full flex items-center justify-center ">
              <div className="text-white space-y-4">
                <Fade
                  direction="up"
                  delay={200}
                  cascade={false}
                  triggerOnce={true}
                >
                  <h1 className=" text-3xl md:text-4xl  lg:text-5xl font-bold text-white text-center">
                    Community
                    <span className="text-[#3F72AF]"> Reviews!</span>
                  </h1>
                  <p className=" text-sm md:text-base lg:text-lg font-bold text-white max-w-screen-md text-center">
                    Engage with your hostel community by sharing meal
                    experiences and reading authentic reviews. Your feedback
                    helps improve the dining experience for everyone.
                  </p>
                   {/* search input start=================================== */}
                 <div className="flex justify-center" >
                 <div className="  ">
                    <fieldset className="w-full space-y-1 dark:text-white">
                      <label htmlFor="Search" className="hidden">
                        Search
                      </label>
                      <div
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <button
                            type=""
                            title="search"
                            className="p-1 focus:outline-none focus:ring"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 512 512"
                              className="w-4 h-4 text-white"
                            >
                              <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                            </svg>
                          </button>
                        </span>
                        <input
                          type="search"
                          name="recipe"
                          placeholder="Search here "
                          className="py-[5px] pl-10 text-sm bg-transparent focus:outline-none border cursor-pointer ring-1 ring-[#3F72AF] outline-none rounded-md"
                        />
                      </div>
                    </fieldset>
                
                  </div>
                 </div>
                   {/* search input enn=================================== */}
                </Fade>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
