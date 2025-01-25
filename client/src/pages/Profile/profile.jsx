import { useContext,useEffect } from 'react';
import './profile.css'
import { Link,useLoaderData,useLocation,useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';
import Chat from '../../components/ChatBox/chat';

export default function Profile()
{
    const {currentUser,update,setOpenChat,setReceiver}=useContext(AuthContext);
    const location=useLocation();
    
    useEffect(()=>
    {
      setOpenChat(location.state?.chat || null);
      setReceiver(location.state?.receiver || null);
    },[location.state, setOpenChat, setReceiver])

    const {posts,chats}=useLoaderData();
    console.log(chats);
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
            <Chat />
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