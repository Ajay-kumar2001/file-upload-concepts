import React,{useState} from 'react';
import '../Css/App.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const FileUpload=()=>{
  const navigate=useNavigate();
  const [image,setImage]=useState('')
  const handleImage=(e)=>{
    setImage(e.target.files[0]);
    console.log(e.target.files);
  }
  const handleapi=async()=>{
    const formData=new FormData();
    formData.append('file',image)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the appropriate content type
        // Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your actual access token
      },
    };
try{
    const response=await axios.post('http://192.168.0.199:4000/upload',formData,config)
          console.log(response.data)
          navigate('/product')
}
catch(error){
  console.log(error);
}
  }
  return(
    <div>
      <center>
    <div className="image-page">
      <input type="file" name="file" onChange={handleImage}/> <br/><br/>
      <button className="submit-page" onClick={handleapi}>submit</button>
    </div>
  
    </center>
    </div>
  )
}
export default FileUpload;