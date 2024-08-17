import './createPost.css';
import { useState ,useRef} from 'react';
import apiRequest from '../../../lib/apiRequest';
import { useNavigate } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from '../../../components/uploadWidget/uploadWidget';


export default function CreatePost()
{
    const quillRef = useRef(null);
    const[error,setError]=useState("");
    const [value,setValue]=useState("");
    const navigate=useNavigate();
    const [images, setImages] = useState([]);

    const handleSubmit=async (e)=>
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        try {
            setImages([]);
            const res = await apiRequest.post("/posts", {
                postData: {
                  tittle: inputs.tittle,
                  price: parseInt(inputs.price),
                  address: inputs.address,
                  city: inputs.city,
                  bedroom: parseInt(inputs.bedroom),
                  bathroom: parseInt(inputs.bathroom),
                  type: inputs.type,
                  property: inputs.property,
                  latitude: inputs.latitude,
                  longitude: inputs.longitude,
                  images: images,
                },
                postDetail: {
                  desc: value,
                  utilities: inputs.utilities,
                  pet: inputs.pet,
                  income: inputs.income,
                  size: parseInt(inputs.size),
                  school: parseInt(inputs.school),
                  bus: parseInt(inputs.bus),
                  restraunt: parseInt(inputs.restraunt),
                },
              });
              console.log(res.data);
            //   console.log(res.data._id);
              navigate("/"+res.data._id);
        } catch (error) {
            setError(error);
            console.log(error.message);
        }
    }
    return (
        <div className="newPostPage">
            <div className="formContainer">
            <h1>Create New Listing</h1>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                <div className="box">
                    <div className="item">
                        <label htmlFor="title">Title</label>
                        <input id="title" name="tittle" type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" type="number" min={0}/>
                    </div>
                    <div className="item">
                        <label htmlFor="address">Address</label>
                        <input id="address" name="address" type="text" />
                    </div>
                </div>
                <div className="item description">
                    <label htmlFor="desc">Description</label>
                    <ReactQuill theme="snow" onChange={setValue} value={value} ref={quillRef} />
                </div>
                <div className="box">
                    <div className="item">
                        <label htmlFor="city">City</label>
                        <input id="city" name="city" type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="bedroom">Bedroom Number</label>
                        <input min={1} id="bedroom" name="bedroom" type="number" />
                    </div>
                    <div className="item">
                        <label htmlFor="bathroom">Bathroom Number</label>
                        <input min={1} id="bathroom" name="bathroom" type="number" />
                    </div>
                </div>
                <div className="box">
                    <div className="item">
                        <label htmlFor="latitude">Latitude</label>
                        <input id="latitude" name="latitude" type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="longitude">Longitude</label>
                        <input id="longitude" name="longitude" type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="type">Type</label>
                        <select name="type">
                        <option value="rent" defaultChecked>
                            Rent
                        </option>
                        <option value="buy">Buy</option>
                        </select>
                    </div>
                </div>
                <div className="box">
                    <div className="item">
                        <label htmlFor="type">Property</label>
                        <select name="property">
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                        </select>
                    </div>

                    <div className="item">
                        <label htmlFor="utilities">Utilities Policy</label>
                        <select name="utilities">
                        <option value="owner">Owner is responsible</option>
                        <option value="tenant">Tenant is responsible</option>
                        <option value="shared">Shared</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="pet">Pet Policy</label>
                        <select name="pet">
                        <option value="allowed">Allowed</option>
                        <option value="not-allowed">Not Allowed</option>
                        </select>
                    </div>
                </div>
               <div className="box">
                <div className="item">
                        <label htmlFor="income">Income Policy</label>
                        <input
                        id="income"
                        name="income"
                        type="text"
                        placeholder="Income Policy"
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="size">Total Size (sqft)</label>
                        <input min={0} id="size" name="size" type="number" />
                    </div>
                    <div className="item">
                        <label htmlFor="school">School</label>
                        <input min={0} id="school" name="school" type="number" />
                    </div>
               </div>
                <div className="box last">
                <div className="item">
                    <label htmlFor="bus">bus</label>
                    <input min={0} id="bus" name="bus" type="number" />
                </div>
                <div className="item">
                    <label htmlFor="restraunt">Restaurant</label>
                    <input min={0} id="restraunt" name="restraunt" type="number" />
                </div>
                </div>
                <div className="submitButton">
                <button className="sendButton">Add</button>
                {error && <span>error</span>}
                </div>
                </form>
            </div>
            </div>
            <div className="sideContainer">
            {images.map((image, index) => (
                <img src={image} key={index} alt="" />
            ))}
            <UploadWidget
                config={{
                multiple: true,
                cloudName: "KhushiJain",
                uploadPreset: "real-estate",
                folder: "posts",
                }}
                setState={setImages}
            />
            </div>
        </div>
        );
}