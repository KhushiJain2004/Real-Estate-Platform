import './property.css'
import {useLoaderData} from 'react-router-dom'
import Slider from '../../components/Slider/slider';
import DOMPurify from 'dompurify';
import avatar from '/noavatar.png'
import ScrollToTop from '../../components/ScrollToTop/scroll';


export default function Property()
{
  const post = useLoaderData();

    return (
        <div className="property">
          <ScrollToTop/>
          <div className="details">
            <div className="wrapper">
              <Slider images={post.images} />
              <div className="info">
                  <div className="singlepost">
                    <h1>{post.tittle}</h1>
                    <div className="address">
                      {/* <img src="/pin.png" alt="" /> */}
                      <span>{post.address}</span>
                    </div>
                    <div className="price">$ {post.price}</div>
                    <div
                  className="bottom"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.postDetail.desc),
                  }}
                ></div>
                </div>

                <div className="user-info">
                    <h2>Listed By:</h2>
                    <div className="userbox">
                      <img src={post.authorId.avatar || avatar} alt="" />
                        <div className="inf">
                          <span>{post.authorId.name}</span>
                        <span>{post.authorId.email}</span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="main-features">
            <div className="wrapper">
              <h1>General Details</h1>
                <div className="general">
                  
                <div className="feature">
                  <img src="/util.jpg" alt="" />
                  <div className="featureText">
                    <span><b>Utilities</b></span>
                    {post.postDetail.utilities === "owner" ? (
                      <p>Owner is responsible</p>
                    ) : (
                      <p>Tenant is responsible</p>
                    )}
                  </div>
                </div>
                <div className="feature">
                  <img src="/pets.jpg" alt="" />
                  <div className="featureText">
                    <span>Pet Policy</span>
                    {post.postDetail.pet === "allowed" ? (
                      <p>Pets Allowed</p>
                    ) : (
                      <p>Pets not Allowed</p>
                    )}
                  </div>
                </div>
                <div className="feature">
                  <img src="/income.jpg" alt="" />
                  <div className="featureText">
                    <span>Income Policy</span>
                    <p>{post.postDetail.income}</p>
                  </div>
                </div>
              </div>
              <div className="main-features">
              <h1>Sizes</h1>
              <div className="sizes">
                <div className="feature">
                  <img src="/size.jpg" alt="" />
                  <div className='text'>
                      <span className="bold">Property Size</span>
                      <p>{post.postDetail.size} sqft</p>
                  </div>
                </div>
                <div className="feature">
                  <img src="/bedroom.jpg" alt="" />
                  <div className="text">
                    <span className="bold">No of bedrooms</span>
                    <p>{post.bedroom}</p>
                  </div>
                </div>
                <div className="feature">
                  <img src="/bathroom.jpg " alt="" />
                  <div className="text">
                    <span className="bold">No of bathrooms</span>
                    <p>{post.bathroom} </p>
                  </div>
                </div>
              </div>
              </div>
              <div className="main-features">
              <h1 >Nearby Places</h1>
                <div className="sizes">
                <div className="feature">
                  <img src="/school.jpg" alt="" />
                  <div className="featureText">
                    <span>School</span>
                    <p>
                      {post.postDetail.school > 999
                        ? post.postDetail.school / 1000 + "km"
                        : post.postDetail.school + "m"}{" "}
                      away
                    </p>
                  </div>
                </div>
                <div className="feature">
                  <img src="/bus.jpg" alt="" />
                  <div className="featureText">
                    <span>Bus Stop</span>
                    <p>{post.postDetail.bus}m away</p>
                  </div>
                </div>
                <div className="feature">
                  <img src="/restraunt.jpg" alt="" />
                  <div className="featureText">
                    <span>Restaurant</span>
                    <p>{post.postDetail.restaurant}m away</p>
                  </div>
                </div>
              </div>
              </div>              

              {/* <p className="title">Location</p> */}
              {/* <div className="mapContainer">
                <Map items={[post]} />
              </div> */}
              {/* <div className="buttons">
                <button>
                  <img src="/chat.png" alt="" />
                  Send a Message
                </button> */}
                {/* <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: saved ? "#fece51" : "white",
                  }}
                >
                  <img src="/save.png" alt="" />
                  {saved ? "Place Saved" : "Save the Place"}
                </button> */}
              </div>
            </div>
          </div>
        // </div>
      );
}