import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Layout()
{
    return (
    <div className="layout">
        <div className="navbar">
            <Navbar />
        </div>
        <div className="content">
            <Outlet />
        </div>
    </div>
    );
}
export function RequireAuth() {
    const { currentUser } = useContext(AuthContext);
  
    if (!currentUser) return <Navigate to="/login" />;
    else {
      return (
        <div className="layout">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="content">
            <Outlet />
          </div>
        </div>
      );
    }
  }
  