import PropTypes from "prop-types";
import Navbar from "components/layouts/Navbar";
import { handleGetAllPostsForHomepage } from "client-utils/functions/handling.functions";
import { PostCard } from "components/sections/Cards";

const HomePage = ({ allPostsData }) => {
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
              { Array.isArray(allPostsData) && allPostsData.length > 0 ? allPostsData.map((postData) => {
                const { id, name, title, createdAtFromNow } = postData;

                return (
                  <PostCard
                    key={id}
                    postId={id}
                    postTitle={title}
                    postedBy={name}
                    postedBefore={createdAtFromNow}
                    postComments="10 comments"
                    postUpvotes="5"
                  />
                );
              }) : <h1>No posts available</h1>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const allPostsDataResponse = await handleGetAllPostsForHomepage();

  return {
    props: { allPostsData: allPostsDataResponse },
  };
};

HomePage.propTypes = {
  allPostsData: PropTypes.array,
};
