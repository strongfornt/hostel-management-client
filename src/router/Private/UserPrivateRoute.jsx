/* eslint-disable react/prop-types */


import { Navigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";




// import Spinner from "../Shared/Spinner/Spinner";

export default function UserPrivateRoute({ children }) {
  const location = useLocation();

  const { user, loading } = useAuth()

  if (loading) {
    return <h1>hello loading</h1>;
  }

  if (user) return children;

  return <Navigate to="/joinUs" state={location.pathname} replace={true} />;
}