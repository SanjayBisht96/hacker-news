import { useState } from 'react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../../components/Navbar'));
const PostForm = dynamic(() => import('../../components/PostForm'));

export default function CreatePost(){
    const [formData, updateFormData] = useState({});
  
    const handleChange = (e) => {
      updateFormData({
        ...formData,
  
        // Trimming any whitespace
        [e.target.name]: e.target.value.trim(),
        //["userID"]: "1"
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      // ... submit to API or something
      
        const res = await fetch(
          '/api/submit/post',
          {
            body: JSON.stringify({
              formData
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }
        );
    
        if(res.status === 200){
          const {message} = await res.json();
        }
    };
  
    return (
      <>
        <Navbar/>
        <PostForm 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
        />
      </>
    );
  }