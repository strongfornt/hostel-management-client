import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function ManageUsers() {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
        // use tanstack for fetch users data =====================
        const {data: allUsers =[], isLoading} = useQuery({
            queryKey: ['users'],
            queryFn: async() => {
                    const {data} = await axiosSecure.get(`/users`)
                    return  data;
            }
        })
        // use tanstack for fetch users data end =====================
        //use tanstack Mutation for update users role ================
        const {mutateAsync} = useMutation({
          mutationFn: async ({ id, role }) => {
               await axiosSecure.patch(`/users/${id}`,{role})
           
          },
          onSuccess:()=>{
            toast.success('User role updated successfully!')
             queryClient.invalidateQueries({queryKey:['users']})
            
          }
        })
        //and a helper function =====================
          const handleMakeAdmin = async(user) =>{
              const role = user?.role;
              const id = user?.id
              // if(role === 'User'){
              //   console.log('hell');
              // }
           await mutateAsync({id,role})
          }
        //use tanstack Mutation for update users role ================

  return (
    <>
      <section className=" my-7 md:my-10  min-h-[calc(100vh-72px)] md:min-h-screen  flex flex-col  md:ml-[15rem] lg:ml-1  xl:ml-44  ">
            <div>
                    <h1 className=" text-center text-2xl md:text-3xl font-bold text-[#4b5664] mb-2" >User Management <span className="text-[#3F72AF]" >Hub</span></h1>
                    <p className="text-sm text-center mb-8 max-w-screen-sm mx-auto text-[#4b5664] " >A centralized platform to manage user accounts, check subscription statuses, and grant admin permissions effortlessly.</p>
            </div>
        <div className="container  mx-auto  text-gray-100 dark:text-gray-800">
          <h2 className="mb-4 text-2xl  font-semibold leading-tight">
            Users
          </h2>
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
              {
                allUsers?.map((user,idx) =>   <tr key={idx} className="border-b border-opacity-20 border-gray-700 dark:border-gray-300 bg-[#F9F7F7]">
                <td className="p-3">
                  <p>{user?.name}</p>
                </td>
                <td className="p-3">{/* <p>Microsoft Corporation</p> */}</td>
                <td className="p-3">
                  <p>{user?.email}</p>
                </td>
                <td className="p-3">
                  {
                    user?.role === 'Admin'? <button>
                    <p className="bg-emerald-100/60 px-3 font-semibold  cursor-not-allowed py-1 w-fit text-emerald-500  rounded-md">
                      {user?.role}
                    </p>
                  </button> : <button 
                    onClick={()=> handleMakeAdmin({role:'Admin',id:user?._id}) }
                  className=" cursor-pointer" >
                      <p className="bg-red-100/60 px-3 font-semibold   py-1 w-fit text-red-500 rounded-md" >Make Admin</p>
          
                      </button> 
                  }
                   
                  
                </td>
                <td className="p-3 text-right">
                  <p></p>
                </td>
                <td className="p-3 ">
                  <span className="px-3 py-1 font-semibold rounded-md  bg-[#3F72AF] text-gray-900 dark:text-gray-50">
                    <span>{user?.badge}</span>
                  </span>
                </td>
              </tr> )
              }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
