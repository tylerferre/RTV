import React, {useContext, useState} from "react";
import { UserContext } from "../context/UserProvider.jsx";


const initInputs = {
    title: '',
    description: ''
}

const IssueForm = (props) => {

    const [inputs, setInputs] = useState(initInputs);
    const {addIssue, toggleForm} = useContext(UserContext);

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addIssue(inputs);
        setInputs(initInputs);
        toggleForm();
    }

    return(
        <form className="issueForm" onSubmit={handleSubmit}>
            <span onClick={toggleForm} className="material-symbols-outlined">close</span>
            <input 
            type="text" 
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Title"
            />
            <textarea 
            type="text" 
            name="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="Description"
            />
            <button>Add</button>
        </form>
    )
}

export default IssueForm;