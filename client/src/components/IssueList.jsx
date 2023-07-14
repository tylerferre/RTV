import React from "react";
import Issue from '../components/Issue.jsx'

const IssueList = (props) => {
    return(
        <div className="issueList">
            {props.issues.map((issue, index) => <Issue {...issue} key={index} />)}
        </div>
    )
}

export default IssueList