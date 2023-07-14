import React, { useContext, useState } from "react";
import AuthForm from "./AuthForm";
import { UserContext } from "../context/UserProvider";

const initInputs = {username: '', password: ''}

const Auth = () => {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(true)

    const {login, signup, errMsg, resetAuthErr} = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSignup = (e) => {
        e.preventDefault()

        signup(inputs)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        login(inputs)
    }

    const toggleForm = () => {
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return(
        <div className="authContainer">
            <h1>RTV</h1>
            {!toggle ? 
                <>
                    <AuthForm 
                    handleChange={handleChange}
                    handleSubmit={handleSignup} 
                    inputs={inputs}
                    btnText='Sign up'
                    errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Already a member?</p>
                </>
            :
                <>
                    <AuthForm 
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText='Login'
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Not a member?</p>
                </>
            }
        </div>
    )

}

export default Auth
