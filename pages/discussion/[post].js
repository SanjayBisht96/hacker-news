import dynamic from 'next/dynamic';
import superJson from 'superjson';
import PropTypes from 'prop-types';
import fetchPost from '../../utils/fetchPost';


const Navbar = dynamic(() => import('../../components/layouts/Navbar'));
const DiscussionForum = dynamic(() => import('../../components/DiscussionForum'));


export default function Discussion({post,comments}){
    return (
    <main className="homepage">
    <Navbar />

    <section className="homepage__container">
      <div className="homepage__container__content">
        <div className="homepage__container__content__header">
          <h1 className="heading-sub homepage__container__content__header__heading">
            Discussion
          </h1>
        </div>
        <div className="homepage__container__content__main">
          <div className="homepage__container__content__main__posts">
                <DiscussionForum
                  postTitle={post.name}
                  postedBy={'sanjay'}
                  postedBefore={post.createdAt}
                  postComments={"comments"}
                  postUpvotes={"1xx"}
                  postUrl={post.url}
                  comments={comments}
                />
          </div>
        </div>
      </div>
    </section>
  </main>
    );
}

export const getServerSideProps = async function (req) {
    const {postID} = req.query
    let post = await fetchPost(postID);
    let comments = superJson.serialize(await fetchPost(postID));
    let {json} =  superJson.serialize(post);
    post = json;
    
    return {
        props: { post, comments },
    }
}
