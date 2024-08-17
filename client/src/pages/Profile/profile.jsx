import { useContext } from 'react';
import './profile.css'
import { Link,useLoaderData,useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import apiRequest from '../../lib/apiRequest';
import Card from '../../components/Card/Card';

export default function Profile()
{
    const {currentUser,update}=useContext(AuthContext);
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
    return (
        <div className="profilePage">
          <div className="details">
            <div className="wrapper">
              <div className="title">
                <h1 className='user-tittle'>User Information</h1>
                <Link to="/profile/update">
                  <button>Update Profile</button>
                </Link>
              </div>
              <div className="info">
                <span>
                  Avatar:
                  <img src={currentUser.avatar || "noavatar.png"} alt=""  className='avatar-icon'/>
                </span>
                <span>
                  Username: <b>{currentUser.name}</b>
                </span>
                <span>
                  E-mail: <b>{currentUser.email}</b>
                </span>
                <button onClick={handleLogout}>Logout</button>
              </div>
              <div className="title">
                <h1 className='user-tittle'>My List</h1>
                <Link to="/profile/addPost">
                  <button>Create New Post</button>
                </Link>
              </div>
              <div className="postContainer">
                {posts.map(post=>(
                  <Card key={post._id} item={post}/>
                ))}
              </div>
              {/* <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => <List posts={postResponse.data.userPosts} />}
                </Await>
              </Suspense> */}
              {/* {/* <div className="title">
                <h1>Saved List</h1>
              </div>
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                </Await>
              </Suspense> */}
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