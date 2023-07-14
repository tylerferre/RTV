import React, { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { UserContext } from "../context/UserProvider";
import CommentList from "./CommentList";


const Issue = (props) => {

    const [toggle, setToggle] = useState(false)

    const toggleComments = () => {
        setToggle(prev => !prev)
    }

    const setTrue =() => {
        setToggle(true)
    }

    const {
        addComment, 
        comments,
        upVote,
        downVote,
    } = useContext(UserContext)

    const filteredComments = comments.filter(item => item.issue === props._id)

    return(
        <div className="issue">
            <h3 className="issueName">{props.user.username}</h3>
            <h1>{props.title}</h1>
            <h4>{props.description}</h4>
            <div className="votes">
            </div>
            <div className="voteButtons">
                <div className="up"><button onClick={()=> upVote(props._id)}><span className="material-symbols-rounded">thumb_up</span></button><h3>{props.upVotes.length}</h3></div>
                <div className="down"><button onClick={()=> downVote(props._id)}><span className="material-symbols-rounded">thumb_down</span></button><h3>{props.downVotes.length}</h3></div>
            </div>
            <CommentForm addComment={addComment} issueId={props._id} setTrue={setTrue}/>
            <p className="commentBtn" style={{cursor: 'pointer', width: 'fit-content'}} onClick={toggleComments}>Comments</p>
            {toggle && <div>
                
                <CommentList comments={filteredComments} />
            </div>}
        </div>
    )
}

export default Issue