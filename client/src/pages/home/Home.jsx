// import {useContext} from 'react';
import "./home.css";
import Search from '../../components/Search/search';

export default function Home()
{
    // eslint-disable-next-line no-unused-vars
    // const {currentUser} =useContext();
    return (
        <div className="homePage">
          <div className="textContainer">
            <div className="wrapper">
              <h1 className="title">Find Your Dream Place</h1>
              <p className="desc">
              Explore the best properties in your desired location with us!<br></br>
              With over 16 years of expertise in the real estate industry, we are dedicated to helping you find the perfect property that meets your needs and preferences
              </p>
              <Search />
              {/* <div className="boxes">
                <div className="box">
                  <h1>16+</h1>
                  <h2>Years of Experience</h2>
                </div>
                <div className="box">
                  <h1>200</h1>
                  <h2>Award Gained</h2>
                </div>
                <div className="box">
                  <h1>2000+</h1>
                  <h2>Property Ready</h2>
                </div>
              </div> */}
            </div>
          </div>
          <div className="imgContainer">
            <img src="/home4.jpg" alt="" className="img" />
          </div>
        </div>
      );
}
