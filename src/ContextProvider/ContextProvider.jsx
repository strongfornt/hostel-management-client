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
        const userEmail = currentUser?.email || user?.email;
        const loggedUser = {email: userEmail}
        if (currentUser) {
            setUser(currentUser);
            setLoading(false);
            //action for sending user information to database start =============================
            const {displayName, email, photoURL} = currentUser || user;
            const userInfo = {
                name:displayName,
                email,
                photo:photoURL,
                badge:"Bronze"
            }
            
            const sendUserData = async () => {
                 await axiosPublic.post('/users',userInfo)
            
            }
            sendUserData();
            //action for sending user information to database start =============================

              //if user exist then issue a token ===============================
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
    }, [axiosPublic,user]);
  
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