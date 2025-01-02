import { useContext, useState } from 'react';
import './profile.css'
import { Link,useLoaderData,useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';

export default function Profile()
{
    const {currentUser,update}=useContext(AuthContext);
    const [isWindowOpen,setWindowOpen]=useState(false);
    const posts=useLoaderData();
    const navigate=useNavigate();

    const handleLogout=async()=>
    {
        try{
            await apiRequest.post("/auth/logout");
            update(null);
            navigate("/");
        }
        catch(err)
        {
            console.log(err.message);
        }

    }
    const closeChatBox=()=>
    {
      setWindowOpen(false);
      // document.getElementById("personalWindow").style.display="none"
    }
    const openWindow=()=>
    {
      setWindowOpen(true);
      // document.getElementById("personalWindow").style.display="block"
    }
    return (
        <div className="profilePage">
          <div className="postContainer">
              <div className="heading">
                <h1 className='user-tittle'>My Listings</h1>
                <Link to="/profile/addPost">
                  <div><i className="fa fa-plus-circle" aria-hidden="true"></i></div>
                </Link>
              </div>
                {posts.map(post=>(
                  <Card key={post._id} item={post}/>
                ))}
              </div>
          <div className="details">
              <div className="heading">
                <h1 className='user-tittle'>User Details</h1>
                <Link to="/profile/update">
                  <div><i className="fa fa-pencil" ></i></div>
                </Link>
              </div>
              <div className="userInfo">
                <div className="avatar">
                    <img src={currentUser.avatar || "noavatar.png"} alt=""  className='avatar-icon'/>
                </div>
                <div className="user-details">
                  <div className="userDetailField">
                    <span>
                      <b>{currentUser.name}</b>
                    </span>
                  </div>
                  <div className="userDetailField">
                    <span>
                       <b>{currentUser.email}</b>
                    </span>
                  </div>
                <button onClick={handleLogout} className='user-button'>Logout</button>
                  
                </div>

              </div>
              
            
          <div className="chatContainer">
            <h2>Messages</h2>
            <div className="chats">
              <div className="sender" onClick={openWindow}>
                <div className="senderdetails">
                  <img src="./noavatar.png" alt="" className='senderIcon' />
                  <div> user</div>
                </div>
                <span className='lastmsg'>fnkewn</span>
                <div className="unreadCount">3</div>
              </div>
              <div className="sender">
                <img src="./noavatar.png" alt="" className='senderIcon' />
                <span className='lastmsg'>dnjwbf</span>
              </div>
              <div className="sender">
                <img src="./noavatar.png" alt="" className='senderIcon' />
                <span className='lastmsg'>fnken</span>
              </div>
            </div>
            {isWindowOpen && 
            <div className="personalWindow" id="personalWindow">
            <div className="senderInfo">
              <img src="./noavatar.png" alt="" className='senderIcon' />
              <div className='name'>Sender</div>
              <div className='close' onClick={closeChatBox}>x</div>
            </div>
            <div className="chatsBySender">
              <div className="msgBox">
                <div className="box">
                  <input type="text" placeholder='Enter msg' />
                </div>
                <div className="send">Send</div>
              </div>
            </div>
          </div>  }
          </div>
          </div>
          {/* <div className="chatContainer">
            <div className="wrapper">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.chatResponse}
                  errorElement={<p>Error loading chats!</p>}
                >
                  {(chatResponse) => <Chat chats={chatResponse.data}/>}
                </Await>
              </Suspense>
            </div>
          </div> */} 
        </div>
      );
}