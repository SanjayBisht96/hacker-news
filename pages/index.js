import dynamic from 'next/dynamic';
import fetchPost from '../utils/fetchPost';
import superJson from 'superjson';
import PropTypes from 'prop-types';


const Navbar = dynamic(() => import('../components/Navbar'));

export default function Home({postList}) {

  return (
    <>
      <div className={"postList"}>
       {postList.map((item,index)=> 
      <div key={index} className={"postList_item"}>
        <span className={"postList_item_vote_img"}>
              <span><img src="./assets/caret-up.svg" /></span>
              <span><img src="./assets/caret-down.svg" /></span>
        </span>
        <span className={"postList_item_name"}>
            <span className={"postList_item_name_title"}>{item.name}</span>            
          </span>
        <span className={"postList_item_description"}>
          <span>{"by username"}</span>
          <span>created at {item.createdAt}</span>
          <span>{"edit link"}</span>
          <span>{"delete link"}</span>
        </span>
        </div>
       )} 
        </div>
    </>
  )  
}


export const getServerSideProps = async function ({ req, res }) {
      let postList = await fetchPost();
      let {json} =  superJson.serialize(postList);
      postList = json;
  return {
    props: {postList },
  }
}

Home.propTypes = {
  postList: PropTypes.array
};