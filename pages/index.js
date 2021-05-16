import { useState, useEffect } from "react";
import Navbar from "components/layouts/Navbar";
import { handleGetAllPostsForHomepage } from "client-utils/functions/handling.functions";
import { LinkPostCardsContainer } from "components/sections/Cards";
import { PaginationButtons } from "components/sections/Buttons";

const HomePage = () => {
  const [pageNo, setPageNo] = useState(1);
  const [allLinkPosts, setAllLinkPosts] = useState([]);

  const fetchAllHomepageLinkPosts = async () => {
    const allPostsDataResponse = await handleGetAllPostsForHomepage();
    setAllLinkPosts(allPostsDataResponse);
  };

  useEffect(() => {
    fetchAllHomepageLinkPosts();
  }, []);

  const handleGetAllPostsWithPageNo = async ({ isNextClicked }) => {
    let upcomingPageNo;

    if (isNextClicked) upcomingPageNo = pageNo + 1;
    else upcomingPageNo = pageNo - 1;

    const nextPageResponse = await handleGetAllPostsForHomepage(upcomingPageNo);
    setAllLinkPosts(nextPageResponse);

    setPageNo(upcomingPageNo);
  };

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
            <LinkPostCardsContainer allLinkPosts={allLinkPosts} />

            <PaginationButtons
              pageNo={pageNo}
              handleGetAllPostsWithPageNo={handleGetAllPostsWithPageNo}
              listOfPosts={allLinkPosts}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;