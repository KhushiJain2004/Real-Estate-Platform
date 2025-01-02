/* eslint-disable react/prop-types */
import './slider.css'

export default function Slider({images})
{
    return (
        <div className="slider"> 
            <div className='big'>
                <img src={images[0]} alt="" />
            </div>
            <div className="small">
                {images.slice(1).map((img,index)=>
                    <div className="smallImg" key={index}>
                        <img src={img} alt=""  />
                    </div>
                )}
        </div></div>
    )
}