// import { Suspense } from 'react'
import './list.css'
import {  useLoaderData } from 'react-router-dom'
import Card from '../../components/Card/Card'
// import ScrollToTop from '../../components/ScrollToTop/scroll';

export default function List(){
    const posts=useLoaderData();
    console.log(posts);
    return(
        <>
            <div className="listContainer">
            {posts.map(post=>
                (
                    <Card key={post._id} item={post}></Card>
                )
            )}
                {/* <Suspense fallback={<p>Loading...</p>}>
                    <Await  
                    resolve={data.postResponse}
                    errorElement={<p>Error loading posts!</p>}>


                    </Await>
                </Suspense> */}
            </div>
        </>
    )
}