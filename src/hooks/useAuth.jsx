import { useContext } from "react"
import { AuthContext } from "../ContextProvider/ContextProvider"


export default function useAuth() {
    const auth = useContext(AuthContext)
  return auth;
}
