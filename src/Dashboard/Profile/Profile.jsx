
import useUserInfo from "../../hooks/useUserInfo"
import Spinner from "../../shared/Spinner/Spinner";
import AdminProfile from "../AdminDashboard/AdminProfile/AdminProfile";
import UserProfile from "../UserDashboard/UserProfile/UserProfile";


export default function Profile() {
    const {userInfo, isUserLoading} = useUserInfo();
    

    if(isUserLoading ) {
        return <Spinner/>
    }

    if( userInfo?.role === 'User') {
        return <UserProfile/>
    }

    if(userInfo?.role === 'Admin') {
        return <AdminProfile/>
    }

}
