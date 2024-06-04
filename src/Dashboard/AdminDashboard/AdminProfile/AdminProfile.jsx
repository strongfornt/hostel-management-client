import { MdEmail } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";

export default function AdminProfile() {
    const {user} = useAuth();

  return (
    <>
        <section className="flex md:ml-48 lg:ml-0 items-center h-full justify-center " >
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-[#3F72AF] rounded-lg shadow-lg ">
          <div className="flex justify-center -mt-16 md:justify-center">
            <img
              className="object-cover w-20 h-20 border-[4px] border-[#3F72AF] rounded-full "
              alt="Testimonial avatar"
              src={user?.photoURL}
            />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 text-center dark:text-white md:mt-0">
           {user?.displayName}
          </h2>

         <div className="text-center  flex items-center justify-center" >
         <p className="mt-2 text-base font-mono text-white flex items-center gap-2 ">
          <MdEmail />
           {user?.email} |
          </p>
         </div>

          <div  >
            <p className="mt-2 text-base text-center font-mono text-white" >Total Added Meals: 50 </p>
          </div>
        </div>
       
      </section>
    </>
  );
}
