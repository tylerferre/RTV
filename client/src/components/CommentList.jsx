import React from "react";
import Comment from '../components/Comment.jsx'

const CommentList = (props) => {
    return(
        <div className="commentList">
            {props.comments.length == 0 ? 'No comments yet' : props.comments.map((comment, index) => <Comment {...comment} key={index} />)}
        </div>
    )
}

export default CommentList