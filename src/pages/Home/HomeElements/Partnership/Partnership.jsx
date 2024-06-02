import Marquee from "react-fast-marquee";
import logo1 from "./../../../../assets/Partner/p1.png";
import client2 from "./../../../../assets/Partner/p2.png";
import client3 from "./../../../../assets/Partner/p3.png";
import client4 from "./../../../../assets/Partner/p4.png";

export default function Partnership() {
  return (
    <>
      <div
        data-aos="zoom-in"
        data-aos-delay="1000 "
        data-aos-duration="1500"
        className=" "

      >
        <Marquee pauseOnHover={true}>
          <div className=" gap-16 md:gap-32 flex">
            <img className="" src={logo1} alt="" />
            <img src={client2} alt="" />
            <img src={client3} alt="" />
            <img src={client4} alt="" />
            <img src={client2} alt="" />
            {/* <img src={client3} alt="" /> */}
          </div>
        </Marquee>
      </div>
    </>
  );
}
