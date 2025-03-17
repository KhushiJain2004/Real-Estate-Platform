/* eslint-disable react/prop-types */
import { useContext, useEffect,useState,useRef } from "react";
import './chat.css'
import '../../pages/Profile/profile.css'
import apiRequest from "../../lib/apiRequest";
import { SocketContext } from "../../context/socketContext";
import { AuthContext } from "../../context/authContext";
// import socket from "../../lib/socket";

export default function Chat()
{
  const {chats,setChats,setOpenChat,setReceiver,receiver,openChat}=useContext(AuthContext);
  const [textMsg,setTextMsg]=useState("");
  const {socket}=useContext(SocketContext);

  const chatEnd=useRef();

  useEffect(()=>
  {
    chatEnd.current?.scrollIntoView({behavior:"smooth"})
  },[openChat])
  useEffect(() => {
    const markRead=async(chatId)=>
    {
      await apiRequest(`./chats/${chatId}`);
      // setChats((prev)=>prev.map(chat)=>chat._id===)
    }
    if(socket)
    {
      socket.on('msgReceived', (data) => {
        console.log("message received : "+data.text);
        if (openChat && openChat._id === data.chatId) {
          // markRead(data.chatId);
          setOpenChat((prev) => ({
            ...prev,
            messages: [...(prev.messages || []), data],
          }));
          setChats(prev=>prev.map(chat=>chat._id===data.chatId? {...chat,lastMessage:data.text}:chat))
          markRead(data.chatId)
          
        }
        else  
        setChats(prev=>prev.map(chat=>chat._id===data.chatId?{...chat,lastMessage:data.text,unreadCount:chat.unreadCount+1}:chat))
      });
    }

    return () => socket.off('msgReceived');
  }, [openChat, setChats, socket,setOpenChat]);


    const sendMsg = async (e) => {
      e.preventDefault();
      try {
        const res = await apiRequest.post(`./msg/${openChat._id}`, { text: textMsg });
        console.log(res.data);

        socket.emit("msg", { to: receiver._id, msg: res.data.msg });
    
        setOpenChat((prev) => ({
          ...prev,
          messages: [...(prev.messages || []), res.data.msg],
        }));

        setChats(prev=>prev.map(chat=>chat._id===openChat._id? {...chat,lastMessage:textMsg}:chat))
        setTextMsg("");
      } catch (error) {
        console.log(error.message);
      }
    };

    const openWindow=async (chatId,receiver)=>
    {
        setReceiver(receiver);
        try {
          let res=await apiRequest(`./chats/${chatId}`);
          console.log(res.data.chat)
          setOpenChat(res.data.chat);
          setChats((prev)=>
            prev.map(chat=>chat?._id===res.data.chat._id? {...chat,unreadCount:0}:chat)
          )
          // socket.on("connect",()=>console.log("user connected from client to socket: "+socket.id));
          // socket.emit("register",receiver._id);
          // console.log(openChat)

        } catch (error) {
          console.log(error.message)
    }

         }
         function getLabel(createdAt) {
            const date = new Date(createdAt); // Convert string to Date object
            const now = new Date(); // Current date and time
          
            // If the date is today
            if (date.toDateString() === now.toDateString()) {
                return ` ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Today)`;
            }
        
            // If the date is yesterday
            const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            if (date.toDateString() === yesterday.toDateString()) {
                return ` ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Yesterday)`;
            }
        
            // For other days, return the day of the week
            const dayOfWeek = date.toLocaleDateString(undefined, { weekday: 'long' });
            return ` ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${dayOfWeek}) `;
        }
        
        
    return(
        <>
        <div className="chats">
              {
                chats?.map((chat)=>
                {
                    console.log(chat);
                  return(
                    <div className="sender"  key={chat._id} onClick={()=>openWindow(chat._id,chat.receiver)}>
                    <div className="senderdetails">
                     <img src={chat.receiver.avatar || './noavatar.png'} alt="" className='senderIcon' />
                      <div> {chat.receiver.name}</div>
                    </div>
                    <span className={`lastmsg ${chat.unreadCount!=0 ? "red" :"blue"}`}>{chat.lastMessage}</span>
                    {chat.unreadCount>0 && <div className="unreadCount">{chat.unreadCount}</div>}
                  </div>
                  )
                })
              }
            
          </div>
            {openChat && 
            <div className="personalWindow" id="personalWindow">
            <div className="senderInfo">
              <img src={receiver.avatar || './noavatar.png'} alt="" className='senderIcon' />
              <div className='name'>{receiver.name}</div>
              <div className='close' onClick={()=>setOpenChat(null)}>x</div>
            </div>
            <div className="chatsBySender">
                <div className="messageContainer">
                  {/* {console.log(openChat)} */}
                    {openChat.messages.map((msg,index)=>{
                        return(
                            <div key={msg._id || index} className={`msg ${msg.senderId===receiver._id ? "leftAlign":"rightAlign"}`}>
                                <span>{msg.text}</span>
                                <span className="time">{getLabel(msg.createdAt)}</span>
                            </div>
                        )
                    })}
                  <div ref={chatEnd}></div>
                </div>
              <div className="msgBoxContainer">
                  <form className="msgBox" onSubmit={sendMsg}>
                    <div className="box">
                      <input type="text" placeholder='Enter msg' id="msgInput" value={textMsg} onChange={(e)=>setTextMsg(e.target.value)} />
                    </div>
                    <button className="send" >Send</button>
                  </form>
              </div>
            </div>
          </div>  }
        </>
    )
}