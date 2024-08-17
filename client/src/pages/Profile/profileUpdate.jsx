import { useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/authContext';
import './profileUpdate.css'
import { useContext, useState } from 'react';
import UploadWidget from '../../components/uploadWidget/uploadWidget';

export default function ProfileUpdate()
{
    const {currentUser,update}=useContext(AuthContext);
    const {error,setError}=useState("");
    const [avatar, setAvatar] = useState([]);
    const navigate=useNavigate();


    const handleSubmit=async (e)=>
    {
        e.preventDefault();
        const formData = new FormData(e.target);

        const { name, email, password } = Object.fromEntries(formData);

        try {
          const res= await apiRequest.put(`/user/${currentUser._id}`,{name,email,password,avatar:avatar[0]});
          console.log(res.data);
          navigate('/profile');
          update(res.data);

        } catch (error) {
          console.log(error)
          setError(error.message);
        }

    }
    return (
        <div className="profileUpdatePage">
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <h1>Update Profile</h1>
              <div className="item">
                <label htmlFor="name">Username</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={currentUser.name}
                />
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentUser.email}
                />
              </div>
              <div className="item">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
              </div>
              <button>Update</button>
              {error && <span>error</span>}
            </form>
          </div>
          <div className="sideContainer">
            <img src={avatar[0] || currentUser.avatar || "/noavatar.png"} alt="" className="avatar" />
            <UploadWidget
              config={{
                cloudName: "KhushiJain",
                uploadPreset: "real-estate",
                multiple: false,
                folder: "avatars",
              }}
              setState={setAvatar}
            />
          </div>
        </div>
      );
}