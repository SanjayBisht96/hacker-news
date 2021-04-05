import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

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
      console.log(formData);
      // ... submit to API or something
      
        const res = await fetch(
          '/api/submit',
          {
            body: JSON.stringify({
              formData,
              userID:1,
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
      <input name="userID" hidden onChange={handleChange} value="1"/>
        <label>
          Title
          <input name="name" onChange={handleChange} />
        </label>
        <br />
        <label>
          URL
          <input name="url" onChange={handleChange} />
        </label>
        <br />
        <span>Or</span>
        <br/>
        <label>
          Text
          <textarea name="text" onChange={handleChange} />
        </label>
        <br/>
        <label>
          Tags
          
        </label>        
        <button onClick={handleSubmit}>Submit</button>
      </>
    );
  };