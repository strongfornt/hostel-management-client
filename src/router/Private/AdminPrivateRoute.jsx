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

  if (user && userInfo?.role ==='Admin') return children;

  return <Navigate to="/joinUs" state={location.pathname} replace={true} />;
}
