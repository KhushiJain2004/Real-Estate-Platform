/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

export default function UploadWidget({config,setState}) {
  const cloudinaryRef = useRef();
  const widgetRef    = useRef();

  useEffect(() => {
    
    if (window.cloudinary) {
        cloudinaryRef.current = window.cloudinary;
  
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
          ...config
        }, (error, result) => {
          if (error) {
            console.error('Upload Widget Error:', error);
          } else if (result.event === 'success') {
            console.log('Upload Result:', result);
            setState(prev => [...prev, result.info.secure_url]);
            // console.log(state);
          }
        });
      } else {
        console.error('Cloudinary script is not loaded');
      }
  }, [config, setState]);

  return(
    <button onClick={()=>widgetRef.current.open()}>Upload</button>
  )
}

