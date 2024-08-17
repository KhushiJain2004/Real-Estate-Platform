/* eslint-disable react/prop-types */
// import apiRequest from '../lib/apiRequest';
import {createContext,useEffect,useState  } from 'react';

export const AuthContext=createContext();

export const AuthContextProvider= ({children})=>
{
    // const fetch=async()=>
    // {
    //     const res= await apiRequest.get("/user/post");
    //     if(res.data.message==="token expired") return null;
    //     return res.data.user;
    // }
    // const [currentUser, setCurrentUser] = useState(()=>{
    //   // const user = localStorage.getItem('user');
    //   const user = fetch();
    //   return user ? JSON.parse(user) : null;
    // });

    const [currentUser, setCurrentUser] = useState(null);

    const update=(data)=>
    {
      setCurrentUser(data);
    }
    useEffect(()=>
    {
      localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser,setCurrentUser]);

    // useEffect(() => {
    //   const initializeUser = async () => {
    //       const user = await fetch();
    //       setCurrentUser(user);
    //   }

    //   const user = localStorage.getItem('user');
    //   if (user) {
    //       setCurrentUser(JSON.parse(user));
    //   } else {
    //       initializeUser();
    //   }
    //   }, []);
    return <AuthContext.Provider value={{currentUser,update}}>{children}</AuthContext.Provider>
}