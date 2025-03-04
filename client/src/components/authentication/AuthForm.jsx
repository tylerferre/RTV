import React from "react";

const AuthForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <input
              type='text'
              value={props.inputs.userName}
              name="username"
              onChange={props.handleChange}
              placeholder="Username"
            />
            <input 
              type="password" 
              value={props.inputs.password}
              name="password"
              onChange={props.handleChange}
              placeholder="Password"
            />
            <button>{props.btnText}</button>
            <p style={{color: 'red'}}>{props.errMsg}</p>
        </form>
    )
}

export default AuthForm