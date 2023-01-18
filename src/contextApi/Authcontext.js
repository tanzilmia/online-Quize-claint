
import React, { createContext, useEffect, useState } from "react";
export const mycontext = createContext();

const Authcontext = ({ children }) => {
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");



  useEffect(() => {
    if(token || isLoggedIn){
      fetch(`http://localhost:5000/userData`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token:  localStorage.getItem("token")
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setuser(data.data)
        console.log(data)
        
      });
    }
  }, [token,isLoggedIn])

  const logout = () =>{
      localStorage.clear()
      isLoggedIn(false)
  }
  

  const contextValue = { loading, user,setIsLoggedIn,logout};
  return (
    <mycontext.Provider value={contextValue}>{children}</mycontext.Provider>
  );
};

export default Authcontext;
