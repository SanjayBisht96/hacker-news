import Navbar from "components/layouts/Navbar";
import useSearch from "hooks/useSearch";
import {POST,ASKPOST,COMMENT,SEARCH_POST_URL, SEARCH_COMMENT_URL} from 'const';
import { PostCard } from "components/sections/Cards";


export default function search(){
    const {result, setSearchTerm, setSearchType, searchType}  = useSearch();

    const searchHandler = () =>{
        let text = document.getElementById("searchbox").value;
        let type = document.getElementById("search_type").value;
        setSearchType(oldType => type);
        setSearchTerm(search => text);
    }

  return (
    <main className="search">
      <Navbar />

      <section className="search_container">
        <select id="search_type">
          <option value={POST}>Link Post</option>
          <option value={ASKPOST}>Ask Post</option>
          <option value={COMMENT}>Comment</option>
        </select>
        <div className="search_container_wrapper">
            <input id="searchbox" focus />
            <div onClick={searchHandler} className="search_container_wrapper_button btn btn-sm">Search</div>
            {
              searchType == POST ?
            <div className="homepage__container__content__main">
            <div className="homepage__container__content__main__posts">
              { Array.isArray(result) && result.length > 0 ? result.map((postData) => {
                console.log(postData);
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
          : ''
        }
        {
            searchType == COMMENT ?
            <div className="homepage__container__content__main">
            <div className="homepage__container__content__main__posts">
              { Array.isArray(result) && result.length > 0 ? result.map((commentData) => {
                const { id, comment, title, createdAtFromNow } = commentData;

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
              }) : <h1>No comment available</h1>}
            </div>
          </div>
          : ''
        }        
        </div>
      </section>
    </main>
  );
};

