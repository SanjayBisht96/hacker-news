import { useState } from 'react';
import superJson from 'superjson';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { HOME_URL } from '../../../const';
import fetchPost from '../../../utils/fetchPost';

const Navbar = dynamic(() => import('../../../components/layouts/Navbar'));
const PostForm = dynamic(() => import('../../../components/PostForm'));

export default function updatePost({postID,post}){
    const [formData, updateFormData] = useState(post);
  
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
          Router.push(HOME_URL);
        }
    };
  
    return (
      <>
      <main className="posting">
        <Navbar/>
        <PostForm 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          postID={postID}
          post={post}
        />
        </main>
      </>
    );
  }


export const getServerSideProps = async function (req) {
    const postID = req.query.post;
    let post = await fetchPost(postID);
    let {json} =  superJson.serialize(post);
    post = json;
    console.log(post);
  return {
    props: { post },
  }
}