import React, {useContext, useEffect} from "react";
import { UserContext } from "../context/UserProvider";

const Comment = (props) => {

    return(
        <div className="comment">
           <p><span className="commentName">{props.user.username}</span>: {props.comment}</p> 
           <hr />
        </div>
        
    )
}

export default Comment