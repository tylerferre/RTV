import React, { useContext } from "react";
import { Link } from 'react-router-dom';
// import { UserContext } from "../context/UserProvider";

const Navbar = (props) => {
    // const {getUserIssues, getPublicIssues} = useContext(UserContext);

    return(
        <div className="navbar">
            <Link to='/profile'><span>Profile</span></Link>
            <Link to='/public'><span>Public</span></Link>
            <span onClick={props.logout}>Logout</span>
        </div>
    )
}

export default Navbar;