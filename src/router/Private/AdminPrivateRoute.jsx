/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../shared/Spinner/Spinner";
import useUserInfo from "../../hooks/useUserInfo";


export default function AdminPrivateRoute({children}) {
    const location = useLocation();
  const { user, loading } = useAuth();
  const {userInfo, isUserLoading} = useUserInfo();

  if (loading || isUserLoading ) {
    return <Spinner />;
  }

  if ( userInfo?.role ==='Admin' && user) return children;

  return <Navigate to="/" state={location.pathname} replace={true} />;
}
