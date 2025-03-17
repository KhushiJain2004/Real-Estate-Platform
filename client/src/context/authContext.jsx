/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import apiRequest from '../lib/apiRequest';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [chats, setChats] = useState(null);
    const [openChat,setOpenChat]=useState(null);
  const [receiver,setReceiver]=useState(null);

    const update = (data) => {
        setCurrentUser(data);
        fetchUser();
    };

    const fetchUser = async () => {
        try {
            const res = await apiRequest.get('/user'); 
            if (res.status === 200) {
                setCurrentUser(res.data.user);
            } else {
                setCurrentUser(null); 
            }
        } catch (error) {
            console.error('Error fetching user:', error.message);
            setCurrentUser(null); 
        }
    };
    const fetchChats=async()=>
    {
        try {
            if (!currentUser) return;
            const res=await apiRequest.get('./chats');
            console.log(res)
            setChats(res.data.updatedChats);
        } catch (error) {
            console.error('Error fetching user:', error.message);
            setChats(null); 
        }
    }
    useEffect(() => {

        fetchUser();
    }, []); 
    useEffect(()=>
    {
        fetchChats()
        setOpenChat(null)
        setReceiver(null)
    },[currentUser])

    // useEffect(()=>{
    //   fetchUser();
    // },[currentUser,setCurrentUser])

    return (
        <AuthContext.Provider value={{ currentUser, update,chats,setChats,openChat,setOpenChat,receiver,setReceiver}}>
            {children}
        </AuthContext.Provider>
    );
};
