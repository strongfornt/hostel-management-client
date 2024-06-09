
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";



export default function useUserInfo() {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
  const {data:userInfo = {}, isLoading: isUserLoading} = useQuery({
    queryKey: ['user-info',user?.email],
    queryFn: async()=> {
        const {data} = await axiosSecure.get(`/user/${user?.email}`)
        return data;
    }
  })
  return {userInfo, isUserLoading}
}
