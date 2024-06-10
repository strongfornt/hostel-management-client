import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


export default function useLikeStatus(allMealsIds) {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic()
    const isEmailExist = user?.email ? true : false;
 

    const {data:likeStatus ={} ,refetch: likeRefetch } = useQuery({
      queryKey:['meal-likes',user?.email],
      enabled: isEmailExist,
      queryFn: async() => {
        const  {data} = await axiosPublic.get(`/likes?email=${user?.email}&mealsIds=${allMealsIds}`)
        return data;
      }
    }) 

    return {likeStatus, likeRefetch}
}
