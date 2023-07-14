import React, { useContext } from "react";
import IssueForm from "./IssueForm.jsx";
import IssueList from "./IssueList.jsx";
import { UserContext } from "../context/UserProvider.jsx";

const Profile= () => {
    const {
        addIssue, 
        user: {username}, 
        issues
    } = useContext(UserContext)

    return(
        <div className="profile">
            <h1>{username}</h1>
            <h3>Add a new Issue</h3>
            <IssueForm addIsssue={addIssue}/>
            <h3>Your Posts</h3>
            <IssueList issues={issues}/>
        </div>
    )
}

export default Profile