import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.config'
const auth = getAuth(app)
export const mycontext = createContext()

const Authcontext = ({children}) => {
const [user, setuser] = useState(null)
const [loading, setloading] = useState(true)

const signup = (email,password) =>{
   setloading(true)
   return createUserWithEmailAndPassword(auth,email,password)
}
const login = (email,password) =>{
   setloading(true)
   return signInWithEmailAndPassword(auth,email,password)
}
const updateuser = (profile)=>{
   setloading(true)
   return updateProfile(auth.currentUser,profile)
}

useEffect(() => {
   const unsbucribe = onAuthStateChanged(auth, (currentuser) => {
     setuser(currentuser);
     setloading(false);
   });

   return () => unsbucribe();
 }, []);





   const contextValue = {signup,updateuser,login,loading,user}
    return (
       <mycontext.Provider value = {contextValue}>
         {children}
       </mycontext.Provider>
    );
};

export default Authcontext;