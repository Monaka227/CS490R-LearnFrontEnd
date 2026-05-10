import React from 'react'

export const InputForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        /* submit the text from input form */
    }

    const handleChange = (e) => {
        /* update the state of input form */
        var inputText = e.target.value;
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
