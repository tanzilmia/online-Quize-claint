
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
export const mycontext = createContext();

const Authcontext = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);
  
  

  const {data:settings={}} = useQuery({
    queryKey:['settings'],
    queryFn : async ()=>{
      const res = await fetch(`https://online-quize-server.vercel.app/settings`)
      const data = await res.json()
      return data
    }
  })
   
  const settingsData = {
    settings : settings.data
  }


  const {data:categorys=[]} = useQuery({
    queryKey:["allCategorys"],
    queryFn: async ()=>{
      const res = await fetch(`https://online-quize-server.vercel.app/allCategorys`)
      const data = await res.json()
      return data
    }
  })

  console.log(categorys)

 const categoryOptions = categorys.data
 const categoryObject = {
      categoryOptions
 }

  
  const token = localStorage.getItem("token");
  useEffect(() => {
    if(token || isLoggedIn){
      fetch(`https://online-quize-server.vercel.app/userData`, {
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
        if(data.data){
          setuser(data.data)
          setloading(false)
        }
      });
    }else{

      setloading(false)
    }
  }, [token,isLoggedIn])

  const logout = () =>{
      localStorage.clear()
      setIsRefreshed(true);
      setuser(null)
      setloading(true)
    setTimeout(() => {
      window.location.reload(true);
    }, 100);
  }
  

  const contextValue = { loading, user,setIsLoggedIn,logout,categoryObject,settingsData,setloading};
  return (
    <mycontext.Provider value={contextValue}>{children}</mycontext.Provider>
  );
};

export default Authcontext;
