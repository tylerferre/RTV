import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserProvider';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Auth = () => {

    const [toggle, setToggle] = useState(true);
    const { resetAuthErr } = useContext(UserContext);

    const toggleForm = () => {
        setToggle(prevState => !prevState);
        resetAuthErr();
    };

    return (
        <div className='auth'>
            <h1 className='logo'></h1>
                {!toggle ? <SignupForm /> : <LoginForm />}
            <p onClick={toggleForm}>{toggle ? 'Not a Member?' : 'Already a Member?'}</p>
        </div>
    );

}

export default Auth;


// import React, { useContext, useState } from "react";
// import AuthForm from "./AuthForm"
// import { UserContext } from "../../context/UserProvider";

// const initInputs = {username: '', password: ''}

// const Auth = () => {
//     const [inputs, setInputs] = useState(initInputs)
//     const [toggle, setToggle] = useState(true)

//     const {login, signup, errMsg, resetAuthErr} = useContext(UserContext)

//     const handleChange = (e) => {
//         const {name, value} = e.target
//         setInputs(prevInputs => ({
//             ...prevInputs,
//             [name]: value
//         }))
//     }

//     const handleSignup = (e) => {
//         e.preventDefault()

//         signup(inputs)
//     }

//     const handleLogin = (e) => {
//         e.preventDefault()

//         login(inputs)
//     }

//     const toggleForm = () => {
//         setToggle(prev => !prev)
//         resetAuthErr()
//     }

//     return(
//         <div className="authContainer">
//             <h1>RTV</h1>
//             {!toggle ? 
//                 <>
//                     <AuthForm 
//                     handleChange={handleChange}
//                     handleSubmit={handleSignup} 
//                     inputs={inputs}
//                     btnText='Sign up'
//                     errMsg={errMsg}
//                     />
//                     <p onClick={toggleForm}>Already a member?</p>
//                 </>
//             :
//                 <>
//                     <AuthForm 
//                         handleChange={handleChange}
//                         handleSubmit={handleLogin}
//                         inputs={inputs}
//                         btnText='Login'
//                         errMsg={errMsg}
//                     />
//                     <p onClick={toggleForm}>Not a member?</p>
//                 </>
//             }
//         </div>
//     )

// }

// export default Auth

