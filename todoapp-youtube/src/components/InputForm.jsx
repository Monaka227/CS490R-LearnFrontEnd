import React from 'react'

export const InputForm = ({ taskList, setTaskList }) => {
    const [inputText, setInputText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        /* submit the text from input form */
        console.log(inputText);

        /* add the new task to the task list */
        setTaskList([
            ...taskList,
            {
                text: inputText
            }
        ]);
        // console.log(taskList);


    }

    const handleChange = (e) => {
        /* update the state of input form */
        setInputText(e.target.value);
        console.log(inputText);
    }

    return (
        <div className="inputForm">
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} />
            <button>
            <i className="fa-solid fa-plus"></i>
            </button>
        </form>
        </div>
    )
}

export default InputForm
