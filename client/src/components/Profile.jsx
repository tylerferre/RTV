import React, { useContext, useEffect } from "react";
import IssueForm from "./IssueForm.jsx";
import IssueList from "./IssueList.jsx";
import { UserContext } from "../context/UserProvider.jsx";

const Profile= () => {
    const {
        addIssue, 
        user: {username}, 
        issues,
        getUserIssues,
        formToggle,
        toggleForm
    } = useContext(UserContext);

    useEffect(() => {
        getUserIssues();
}, []);

    return(
        <div className="profile">
            <h1>{username}</h1>
            <button className="makePost" onClick={toggleForm}>Make Post</button>
            {formToggle && <IssueForm addIsssue={addIssue}/>}
            {/* <h3>Your Posts</h3> */}
            <IssueList issues={issues}/>
        </div>
    )
}

export default Profile;