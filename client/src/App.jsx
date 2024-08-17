import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import './App.css';
import  Register  from './pages/register/register';
import Layout from './pages/Layout/layout';
import Login from './pages/Login/login'
import Home from './pages/home/Home';
import Profile from './pages/Profile/profile';
import { RequireAuth } from './pages/Layout/layout';
import ProfileUpdate from './pages/Profile/profileUpdate';
import CreatePost from './pages/Posts/newPosts/createPost';
import Property from './pages/propertyDetailPage/property';
import List from './pages/PropertyList/list'
import { propertyLoader,listLoader, profileListLoader} from './lib/loaders/propertyLoader';

export default function App()
{
  const  router = createBrowserRouter([{
    path :"/",
    element:<Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/:id",
        element: <Property />,
        loader:propertyLoader
      },
      {
        path: "/list",
        element: <List/>,
        loader:listLoader
      }
    ]
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
        loader:profileListLoader
      }, 
      {
        path: "/profile/update",
        element: <ProfileUpdate />,
      }, 
      {
        path: "/profile/addPost",
        element: <CreatePost />,
      }, 
    ] 
}])
  return(
    <RouterProvider router={router} />
  )
}
