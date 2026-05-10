import React from 'react'

export const TodoList = () => {
  return (
    <div className="todoList">
        <div className="todos">
            <div className="todo">
                <div className="todoText">
                    <span>Programming</span>
                </div>
                <div className="icons">
                    <button>
                    <i className="fa-solid fa-check"></i>
                    </button>
                    <button>
                    <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
      
    </div>
  )
}

