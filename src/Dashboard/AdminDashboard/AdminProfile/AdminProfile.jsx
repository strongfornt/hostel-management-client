import { MdEmail } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import defaultProfile from './../../../assets/Profile/deFaultProfile1.png'
import { Helmet } from "react-helmet-async";

export default function AdminProfile() {
    const {user} = useAuth();

  return (
    <>
  <Helmet>
        <title>DineEase | Profile</title>
      </Helmet>
    
        <section className="flex md:ml-48 lg:ml-0 items-center min-h-[calc(100vh-72px)] md:min-h-screen   justify-center " >
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-[#3F72AF] rounded-lg shadow-lg ">
          <div className="flex justify-center -mt-16 md:justify-center">
            <img
              className="object-cover w-20 h-20 border-[4px] border-[#3F72AF] rounded-full "
              alt={user?.displayName}
              src={user?.photoURL || defaultProfile}
            />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 text-center dark:text-white md:mt-0">
           {user?.displayName ||  'anonymous'}
          </h2>

         <div className="text-center  flex items-center justify-center" >
         <p className="mt-2 text-base font-mono text-white flex items-center gap-2 ">
          <MdEmail />
           {user?.email || '@gmail.com'} |
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
