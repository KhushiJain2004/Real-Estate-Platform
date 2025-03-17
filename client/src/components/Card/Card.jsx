/* eslint-disable react/prop-types */
// import ScrollToTop from '../ScrollToTop/scroll'
import './Card.css'
import { Link, useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
// import { ToastContainer, toast } from 'react-toastify'

export default function Card({item})
{

  const {chats,setOpenChat,setReceiver}=useContext(AuthContext);
  const navigate=useNavigate()
  // console.log(item)
  const save=async ()=>
  {
    console.log(chats)
    // try{
    //   console.log(item._id);
    //   const res=await apiRequest("/posts/save/"+item._id);
    //   console.log(res);
    // }
    // catch(err)
    // {
    //   console.log(err.message);
    // }
  }

  const redirectToChat=async(receiverId)=>
  {
    
   try {
    console.log(receiverId)
    const res=await apiRequest.post("/chats/",{receiverId})
    console.log(res.data)
    if(res.status===502) 
    {
        console.log("chat exists")
    }
    // else if(res.status===400) toast.info("Its your Post!")
    else {
        // setChats(prev=>[...prev,res.data.chat])
    }

    if(res.status!=400)
    {

      setOpenChat(res.data.chat)
      setReceiver(res.data.receiver)
    }

    navigate("/profile")
   } catch (error) {
    console.log(error.message)
   }

  }
    return (
      <>
      {/* <ToastContainer /> */}
      <div className="card">
       
        <Link to={`/${item._id}`} className="imageContainer">
          <img src={item.images[0]} alt="" />
        </Link>
        <div className="cardtextContainer">
          <h2 className="tittle">
            <Link to={`/${item._id}`}><h1>{item.tittle}</h1></Link>
          </h2>
          <h3 className='authorDetails'>Listed By: {item.authorId.name} <span className='emailOfAuthor'>({item.authorId.email})</span></h3>
          <p className="address">
            {/* <img src="/pin.png" alt="" /> */}
            <span>{item.address}</span>
          </p>
          <p className="price">$ {item.price}</p>
          <div className="bottom">
            <div className="features">
              <div className="cardfeature">
                <img src="/bedIcon.png" alt="" />
                <span>{item.bedroom} bedroom</span>
              </div>
              <div className="cardfeature">
                <img src="/bathIcon.png" alt="" />
                <span>{item.bathroom} bathroom</span>
              </div>
            </div>
            <div className="icons">
              <div className="icon">
                <img src="/save.png" alt="" onClick={save} />
              </div>
              <div className="icon">
                <img src="/chat.png" alt="" onClick={()=>redirectToChat(item.authorId)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}