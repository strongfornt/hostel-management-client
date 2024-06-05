/* eslint-disable react/prop-types */
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import useAxiosSecure from "../hooks/useAxiosSecure";
  
  
  
  
  export const AuthContext = createContext(null);
  
  export default function ContextProvider({ children }) {
    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure();
    const githubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();
  
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const [theme,setTheme] = useState("light")
    const [menu, setMenu] = useState(false);
    
    
    const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
    const updateUserProfile = (user, update) => {
      return updateProfile(user, update);
      
    };
    const googleLogin =()=>{
    return  signInWithPopup(auth,googleProvider)
    }
  
    const githubLogin = ()=>{
      return signInWithPopup(auth,githubProvider)
    }
    const logOut =()=>{
      return signOut(auth)
    }
    
  
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        
        if (currentUser) {
            setUser(currentUser);
            setLoading(false);

              // if user exist then issue a token ===============================
              const userEmail = currentUser?.email || user?.email;
        const loggedUser = {email: userEmail}
          axiosPublic.post("/jwt", loggedUser).then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
          });
            
          
        } else {
            localStorage.removeItem("access-token");
          setUser(null);
          setLoading(false)
        }
      });
  
      return () => {
        unSubscribe();
      };
    }, [axiosPublic,user?.email]);
  
    const authInfo = {
      user,
      createUser,
      signInUser,
      updateUserProfile,
      googleLogin,
      githubLogin,
      logOut,
      loading,
      setUser,
      setLoading,
      theme,
      setTheme,
      menu,
      setMenu
     
    };
    return (
      <>
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
      </>
    );
  }