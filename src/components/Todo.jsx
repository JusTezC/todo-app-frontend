import React, { useState } from 'react'
import Button from './common/button'

function Todo({ todo, handleEditTodo, handleDeleteTodo }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editInput, setEditInput] = useState(todo.text)
    return (
        <div className="todolist-div">
            {!isEditing ? (<li
                className={`li-style ${todo.isDone ? "li-style-isDone" : ""}`}
                onClick={() => handleEditTodo(todo._id, { isDone: !todo.isDone })}>
                {todo.text}
            </li>) : (
                <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)} />
            )}
            {!isEditing ?    //turn-nary
                (<Button           //conditional rendering
                    cssid={'edit-button'}
                    clickFunc={() => setIsEditing(true)}
                    buttonName={'Edit'}
                />) : (
                    <Button
                        cssid={'done-button'}
                        clickFunc={() => {
                            handleEditTodo(todo._id, { text: editInput })
                            setIsEditing(false)
                        }}
                        buttonName={"Update"} />
                )}
            <Button
                cssid={'delete-button'}
                clickFunc={() => {
                    handleDeleteTodo(todo._id)
                }}
                buttonName={"Delete"} />
        </div>
    )
}

export default Todo