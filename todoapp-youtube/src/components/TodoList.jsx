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
                    <i class="fa-solid fa-check"></i>
                </div>
                <div className="icons">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
      
    </div>
  )
}

