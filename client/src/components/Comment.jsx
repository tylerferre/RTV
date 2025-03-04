import React, {useContext, useEffect} from "react";
import { UserContext } from "../context/UserProvider";

const Comment = (props) => {

    const {user, deleteComment} = useContext(UserContext)

    return(
        <div className="comment">
           <p><span className="commentName">{props.user.username}</span>: {props.comment}</p>
           {props.user._id === user._id || user.isAdmin && <span className="deleteCommentBtn"><button onClick={()=> deleteComment(props._id)}>X</button></span>}
           <hr />
        </div>
        
    )
}

export default Comment