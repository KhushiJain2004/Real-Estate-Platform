/* eslint-disable react/prop-types */
// import ScrollToTop from '../ScrollToTop/scroll'
import './Card.css'
import { Link } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'

export default function Card({item})
{
  // console.log(item)
  const save=async ()=>
  {
    try{
      console.log(item._id);
      const res=await apiRequest("/posts/save/"+item._id);
      console.log(res);
    }
    catch(err)
    {
      console.log(err.message);
    }
  }
    return (
      <>
      <div className="card">
        <Link to={`/${item._id}`} className="imageContainer">
          <img src={item.images[0]} alt="" />
        </Link>
        <div className="cardtextContainer">
          <h2 className="tittle">
            <Link to={`/${item._id}`}><h1>{item.tittle}</h1></Link>
          </h2>
          <p className="address">
            {/* <img src="/pin.png" alt="" /> */}
            <span>{item.address}</span>
          </p>
          <p className="price">$ {item.price}</p>
          <div className="bottom">
            <div className="features">
              <div className="cardfeature">
                <img src="/bedIcon.png" alt="" />
                <span>{item.bedroom} bedroom</span>
              </div>
              <div className="cardfeature">
                <img src="/bathIcon.png" alt="" />
                <span>{item.bathroom} bathroom</span>
              </div>
            </div>
            <div className="icons">
              <div className="icon">
                <img src="/save.png" alt="" onClick={save} />
              </div>
              <div className="icon">
                <img src="/chat.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}