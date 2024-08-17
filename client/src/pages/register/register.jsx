import {Link,useNavigate} from 'react-router-dom';
import { useState} from 'react';
import apiRequest from '../../lib/apiRequest';
import './register.css'

export default function Register()
{
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit=async (e)=>
    {
        e.preventDefault();
        setError("")
        setIsLoading(true);
        const formData=new FormData(e.target);

        const name=formData.get("name");
        const email=formData.get("email");
        const password=formData.get("password");
        // console.log(name,email,password)

       try {
            const res=await apiRequest.post('auth/register',{name,email,password});
            if(res.data.success==false) throw new Error(res.data.message);
            else navigate('/login');
            console.log(res.data.message);
       } catch (error) {
            setError(error.message);
       }
       finally{
            setIsLoading(false);
       }


    }
    return ( 
        <div className="registerPage">
          <div className="formContainer">
            <form onSubmit={handleSubmit} className='form'>
              <h1>Create an Account</h1>
              <input name="name" type="text" placeholder="Username"  required/>
              <input name="email" type="text" placeholder="Email" required />
              <input name="password" type="password" placeholder="Password" required />
              <button disabled={isLoading}>Register</button>
              {error && <span className="error"> {error}</span>}
              <Link to="/login" className='loginLink'>Do you have an account?</Link>
            </form>
          </div>
          <div className="imgContainer">
            <img src="/register2.jpg" alt="" />
          </div>
        </div>
    )
}