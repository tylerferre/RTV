import React, { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { UserContext } from "../context/UserProvider";
import CommentList from "./CommentList";


const Issue = (props) => {

    const [toggle, setToggle] = useState(false)

    const toggleComments = () => {
        setToggle(prev => !prev)
    }

    const setTrue = () => {
        setToggle(true)
    }

    const {
        addComment, 
        comments,
        upVote,
        downVote,
        user,
        deleteIssue
    } = useContext(UserContext)

    const filteredComments = comments.filter(item => item.issue === props._id)
    const upVotesMap = props.upVotes.map(item => item === user._id)
    const filteredUpVotes = upVotesMap.filter(item => item === true)
    const downVotesMap = props.downVotes.map(item => item === user._id)
    const filteredDownVotes = downVotesMap.filter(item => item === true)

    const votes = () => {
        if(filteredUpVotes.length === 1){
            downVote(props._id)
        }else{
            upVote(props._id)
        }
    }

    return(
        <div className="issue">
            <div className="issueTitleDiv">
                <h3 className="issueName">{props.user.username}</h3>
                {props.user._id === user._id && <button onClick={()=> deleteIssue(props._id)} className="deleteIssueBtn">X</button>}
            </div>
            <h1>{props.title}</h1>
            <h4>{props.description}</h4>
            <div className="votes">
            </div>
            <div className="voteButtons">
                <div className="up"><button onClick={votes}><span style={filteredUpVotes.length === 1 ? {color: '#5e0070'} : {color: 'black'}} className="material-symbols-rounded">thumb_up</span></button><h3>{props.upVotes.length}</h3></div>
                <div className="down"><button onClick={votes}><span style={filteredDownVotes.length === 1 ? {color: '#5e0070'} : {color: 'black'}} className="material-symbols-rounded">thumb_down</span></button><h3>{props.downVotes.length}</h3></div>
            </div>
                <CommentForm addComment={addComment} issueId={props._id} setTrue={setTrue}/>
                <p className="commentBtn" style={{cursor: 'pointer', width: 'fit-content'}} onClick={toggleComments}>Comments</p>
            {toggle && 
            <div>
                
                <CommentList comments={filteredComments} />
            </div>}
        </div>
    )
}

export default Issue