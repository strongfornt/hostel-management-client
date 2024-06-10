import axios from "axios"


const axiosPublic = axios.create({
    baseURL:'http://localhost:5000'
    // baseURL:'https://hostel-management-server-gamma.vercel.app'
})

export default function useAxiosPublic() {
 return axiosPublic;
}
