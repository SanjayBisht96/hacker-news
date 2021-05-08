import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import {EDIT_LINK_POST_URL, DISCUSS_LINK_POST_URL, FETCH_COMMENTS_URL} from '../../const';
import {FormLabelTextAreaGroup} from  '../sections/FormElements';
import useComments from '../../hooks/useComments';
import {  fetchComments } from '../../client-utils/functions/handling.functions';
//import addComment from '../../utils/addComments';
import useSWR,{ mutate,trigger }  from 'swr';

const Comment = dynamic(() => import('../Comment/'));

export default function DiscussionForum({
    postTitle,
    postedBy,
    postedBefore,
    postComments,
    postUpvotes,
    postUrl,
    postID
  }){

    const {  newComment, setNewComment } = useComments(postID);
    const {data ,error} = useSWR( [FETCH_COMMENTS_URL,postID],fetchComments);

    const handleSubmit = async (e) => {
      let text = document.getElementById("commentInput").value;
      if(text){
        setNewComment( newComment => text);
        setTimeout(()=>{
            trigger([FETCH_COMMENTS_URL,postID]);
        },1500);
      }
    }
    
    return (
      <div className="discussion__container__content__main__posts__item">
        <div className="discussion__container__content__main__posts__item__action">
          <h3 className="heading-main">{postUpvotes}</h3>
          <div className="discussion__container__content__main__posts__item__action__container">
            <button className="btn btn-sm discussion__container__content__main__posts__item__action__container__button">
              <svg
                width="44"
                height="23"
                viewBox="0 0 44 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M41 22H3L22 2L41 22Z" stroke="black" strokeWidth="2" />
              </svg>
            </button>
            <button className="btn btn-sm discussion__container__content__main__posts__item__action__container__button">
              <svg
                width="44"
                height="23"
                viewBox="0 0 44 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1L41 1L21 21L3 1Z" stroke="#252323" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
  
        <div className="discussion__container__content__main__posts__item__content">
          <h2 className="heading-sub discussion__container__content__main__posts__item__content__heading">
            <a href={postUrl} target='_blank' rel="noreferrer">
            {postTitle}
            </a>
          </h2>
          <div className="discussion__container__content__main__posts__item__content__footer">
            <p className="paragraph--sub discussion__container__content__main__posts__item__content__footer__paragraph">
              Posted by {postedBy}
            </p>
            <p className="paragraph--sub discussion__container__content__main__posts__item__content__footer__paragraph">
              {postedBefore}
            </p>
            <p className="paragraph--sub discussion__container__content__main__posts__item__content__footer__paragraph">
              {postComments}
            </p>
            <p className="paragraph--sub discussion__container__content__main__posts__item__content__footer__paragraph">
              <a href={EDIT_LINK_POST_URL + postID} >edit</a>
            </p>                        
          </div>
        </div>
        <div className="discussion__container__content__main__posts__item_comment">
            <FormLabelTextAreaGroup
                label={"Add Comment"}
                inputType={"text"}
                id={"commentInput"}
            />
            <button className="btn btn-md form__submit posting__container__content__form__submit" onClick={handleSubmit}>
              Add Comment
            </button>
        {
          data?.map((comment,index) =>{
            return (
              <Comment
                key={index}
                comment={comment.comment}
                ID={comment.id}
              />
          )
          })
        }

        </div>
      </div>
    );
  };
