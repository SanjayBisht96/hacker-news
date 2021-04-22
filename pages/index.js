import dynamic from "next/dynamic";
import superJson from "superjson";
import PropTypes from "prop-types";
import fetchPost from "../utils/fetchPost";

const Navbar = dynamic(() => import("../components/layouts/Navbar"));
const Post = dynamic(() => import("../components/Post"));

const Home = ({ postList }) => {
  return (
    <main className="homepage">
      <Navbar />

      <section className="homepage__container">
        <div className="homepage__container__content">
          <div className="homepage__container__content__header">
            <h1 className="heading-sub homepage__container__content__header__heading">
              All posts
            </h1>
          </div>
          <div className="homepage__container__content__main">
            <div className="homepage__container__content__main__posts">
              {postList.map((postData, key) => {
                const {
                  name: postTitle,
                  postedBy = ["sanjay"],
                  createdAt: postedBefore,
                  postComments = ["comments"],
                  postUpvotes = ["1xx"],
                  url: postUrl,
                } = postData;

                return (
                  <Post
                    postTitle={postTitle}
                    postedBy={postedBy}
                    postedBefore={postedBefore}
                    postComments={postComments}
                    postUpvotes={postUpvotes}
                    postUrl={postUrl}
                    key={key}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps = async function () {
  let postList = await fetchPost();
  let { json } = superJson.serialize(postList);
  postList = json;
  return {
    props: { postList },
  };
};

Home.propTypes = {
  postList: PropTypes.array,
};
