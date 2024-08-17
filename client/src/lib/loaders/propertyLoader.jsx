/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import apiRequest from '../apiRequest.js'
import { AuthContext } from '../../context/authContext.jsx';

export const propertyLoader=async ({params})=>
{
    try {
        const res = await apiRequest(`/posts/${params.id}`);
        return res.data;
      } catch (error) {
        console.error("Error loading property:", error);
        throw new Error("Failed to load property data");
      }
}

export const listLoader=async ({request,params})=>
{
  const url=request.url.split('?');
  const query=url[1];
  // console.log(query);
  const res=await apiRequest("/posts?"+query);
  // console.log(res);
  return res.data;

}
export const profileListLoader=async ({request,params})=>
  {

    const res=await apiRequest('/user/post');
    // console.log(res.data);
    return res.data.posts;
  
  }