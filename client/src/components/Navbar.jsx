import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserProvider";

const Navbar = (props) => {
    const {getUserIssues, getPublicIssues} = useContext(UserContext)

    return(
        <div className="navbar">
            <Link to='/profile'><span onClick={getUserIssues}>Profile</span></Link>
            <Link to='/public'><span onClick={getPublicIssues}>Public</span></Link>
            <button onClick={props.logout}>Logout</button>
        </div>
    )
}

export default Navbar