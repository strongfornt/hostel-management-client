import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


export default function ManageUsers() {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [nameSearch, setNameSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [itemPerPages, setItemPerPages] = useState(10);
  const [count,setCount] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  
  // use tanstack for fetch users data =====================
  const { data: allUsers = [] } = useQuery({
    queryKey: ["users",nameSearch,emailSearch,currentPage,itemPerPages],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?name=${nameSearch}&email=${emailSearch}&page=${currentPage}&size=${itemPerPages}`);
      return data;
    },
  });
      //count the total documents ============
      useEffect(()=>{
        const getCount = async() =>{
          const {data} = await axiosPublic.get(`/users_count?name=${nameSearch}&email=${emailSearch}`)
          setCount(data?.usersCount)
        
        }
        getCount()
      },[axiosPublic,emailSearch,nameSearch])
      const numberOfPages = Math.ceil(count / itemPerPages);
      const paginationCount = [
        ...Array(numberOfPages)
          .keys()
      ].map(c => c+1);
    
        const handlePrev =() =>{
            if(currentPage > 1){
                setCurrentPage(currentPage -1)
                
            }
            
        }
        const handleNext = () =>{
             if(currentPage < paginationCount?.length){
                setCurrentPage(currentPage +1) 
             }
        }
  // use tanstack for fetch users data end =====================
  //use tanstack Mutation for update users role ================
  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/${id}`, { role });
    },
    onSuccess: () => {
      toast.success("User role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  //and a helper function =====================
  const handleMakeAdmin = async (user) => {
    const role = user?.role;
    const id = user?.id;
    await mutateAsync({ id, role });
  };
  //use tanstack Mutation for update users role ================


  return (
    <>
     <Helmet>
        <title>DineEase | ManageUsers</title>
      </Helmet>
      <section className=" my-7 md:my-10    flex flex-col  md:ml-[15rem] lg:ml-1  xl:ml-44  ">
        <div>
          <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2">
            User Management <span className="text-[#3F72AF]">Hub</span>
          </h1>
          <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] ">
            A centralized platform to manage user accounts, check subscription
            statuses, and grant admin permissions effortlessly.
          </p>
        </div>
        {/* search functionality star ===================================================== */}
        <div className="overflow-x-auto ">
          {/* search functionality start here==================== */}
          <div className="container px-2 w-fit mx-auto  flex items-center justify-center  gap-4 md:gap-8  lg:gap-8  py-5">
            {/* search by user name start ================================== */}
            <div className="">
              <fieldset className="w-full space-y-1 dark:text-gray-800">
                <label htmlFor="Search" className="hidden">
                  Search
                </label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNameSearch(e.target.name.value);
                    setEmailSearch('')
                    e.target.reset();
                  }}
                  className="relative"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      title="search"
                      className="p-1 focus:outline-none focus:ring"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 dark:text-gray-800"
                      >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="name"
                    placeholder="Search by name"
                    className="py-[5px] pl-10 text-sm   focus:outline-none border cursor-pointer ring-1 ring-[#3F72AF] outline-none rounded-md"
                  />
                </form>
              </fieldset>
            </div>
            {/* search by user name end ================================== */}
            {/* Reset query button ================================= */}
            <div className="">
              <button
                onClick={() => {
                  setEmailSearch('');
                  setNameSearch('')
                }}
                className="px-4 py-1 bg-[#3F72AF] text-white rounded-md hover:bg-[#4b8bd9] duration-300 font-medium"
              >
                Reset
              </button>
            </div>
            {/* Reset query button ================================= */}
            {/* search by email start ============================================ */}
            <div>
              <fieldset className="w-full space-y-1 dark:text-gray-800">
                <label htmlFor="Search" className="hidden">
                  Search
                </label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEmailSearch(e.target.email.value);
                    setNameSearch('')
                    e.target.reset();
                  }}
                  className="relative"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      title="search"
                      className="p-1 focus:outline-none focus:ring"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 dark:text-gray-800"
                      >
                        <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="email"
                    placeholder="Search by email"
                    className="py-[5px] pl-10 text-sm   focus:outline-none border cursor-pointer ring-1 ring-[#3F72AF] outline-none rounded-md"
                  />
                </form>
              </fieldset>
            </div>
            {/* search by email end ============================================ */}
          </div>
          {/* search functionality end here ============================ */}
        </div>
        {/* search functionality end ===================================================== */}

        <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
          <h2 className="mb-4 text-2xl  font-semibold leading-tight">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="bg-gray-700 dark:bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3"></th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-right"></th>
                  <th className="p-3"> Subs/Status</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((user, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]"
                  >
                    <td className="p-3">
                      <p>{user?.name}</p>
                    </td>
                    <td className="p-3">
                      {/* <p>Microsoft Corporation</p> */}
                    </td>
                    <td className="p-3">
                      <p>{user?.email}</p>
                    </td>
                    <td className="p-3">
                      {user?.role === "Admin" ? (
                        <button>
                          <p className="bg-emerald-100/60 text-emerald-500 px-3 font-semibold  cursor-not-allowed py-1 w-fit   rounded-md">
                            {user?.role}
                          </p>
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleMakeAdmin({ role: "Admin", id: user?._id })
                          }
                          className=" cursor-pointer"
                        >
                          <p className="bg-red-100/60 text-red-500 px-3 font-semibold   py-1 w-fit  rounded-md">
                            Make Admin
                          </p>
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <p></p>
                    </td>
                    <td className="p-3 ">
                      <span className="px-3 py-1 font-semibold rounded-md  bg-indigo-100/60 text-indigo-500  ">
                        <span>{user?.badge}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
       {/* main sectinend */}
       <div className="mb-6 mt-6 flex items-center  justify-center">
       
       <nav
         aria-label="Pagination"
         className="inline-flex -space-x-px bg-gray-50  rounded-md shadow-sm"
       >
         <button
         onClick={handlePrev}
           type="button"
           className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300"
         >
           <span className="sr-only">Previous</span>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true"
             className="w-5 h-5 text-black"
           >
             <path
               fillRule="evenodd"
               d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
               clipRule="evenodd"
             ></path>
           </svg>
         </button>
      {
       paginationCount?.map((c,i)=>  <button
          key={i}
           type="button"
           aria-current="page"
           className={`inline-flex items-center px-4 py-2  text-sm font-semibold border ${currentPage === c ?'bg-teal-400 text-white':'text-black'   } 
           dark:border-gray-300`}
           
           
           onClick={()=> setCurrentPage(c)}
         >
           {c}
         </button>
       )
      }

         <button
         onClick={handleNext}
           type="button"
           className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-300"
         >
           <span className="sr-only">Next</span>
           <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="currentColor"
             aria-hidden="true"
             className="w-5 h-5 text-black "
           >
             <path
               fillRule="evenodd"
               d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
               clipRule="evenodd"
             ></path>
           </svg>
         </button>
       </nav>
       
     </div>
    </>
  );
}
