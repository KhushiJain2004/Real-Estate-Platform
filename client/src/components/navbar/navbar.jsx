import { useContext, useState ,useEffect} from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Navbar()
{
    const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const handleResize = () => {
    if (window.innerWidth > 950) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


//   const fetch = useNotificationStore((state) => state.fetch);
//   const number = useNotificationStore((state) => state.number);

  // if(currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <div className="menuIcon">
            <img
              src="/menu.png"
              alt=""
              onClick={() => setOpen((prev) => !prev)}
            />
          </div>
          <div className={open ? "menu active" : "menu"}>
            <Link to="/">Home</Link>
            <a href="/">About</a>
            <a href="/">Contact</a>
            <a href="/">Agents</a>
            {currentUser?
            <Link to="/profile" onClick={() => setOpen((prev) => !prev)} >
            Profile
            </Link>
            :(
                <Link to="/login" onClick={() => setOpen((prev) => !prev)}>Sign in</Link>
            )
            }
          </div>
        <a href="/" className="logo">
          {/* <img src="/logo.png" alt="" /> */}
          <span>HomeScape</span>
        </a>
      </div>
      <div className="center">
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <Link to="/profile" className="profile">
            <div className="user">
            <img src={currentUser.avatar || "/noavatar.png"} alt="" />
            <span className="username">{currentUser.name}</span>
              {/* {number > 0 && <div className="notification">{number}</div>} */}
              {/* <span>Profile</span> */}
          </div>
          </Link>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
      </div>
    </nav>
  );
}