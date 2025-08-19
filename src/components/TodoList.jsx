import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'
import axios from 'axios'

function TodoList() {
    // function, state
    const [todoList, setTodoList] = useState([])
    //getter           //change state of setter
    const [textInput, setTextInput] = useState("")

    useEffect(()=>{
        async function getAllTodos(){  //function makes the call to the API` AXIOS IS A FETCH
            try {
                const response = await axios.get(
                    `${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/todo/get-all-todos`) // making a request as we were in postman
                setTodoList(response.data.payload)
            } catch (error) {
                console.log(error)
            }
        }
        getAllTodos()
    }, [])

    function handleChangeIsDone(id,) {
        
        // given an id, make a new list using the old list but only changing the object with the id
        const newList = todoList.map(item => {   //loop through array
            if (item.id === id) {  //if we arrive at an object with the matching id, 
                item.isDone = !item.isDone //toggle isDOne
            }
            return item    //push the item into the new array
        })
        setTodoList(newList) //set the new list
    }

    async function handleEditTodo(id, updateObj) {
       try {
        console.log(updateObj)
            const response = await axios.put(`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/todo/update-todo/${id}`, updateObj)
            console.log(response.data)
            const newList = todoList.map(item => { //loop through array
                if(item._id === id){ //if we arrive at an object with the matching id,
                    item = response.data.payload
                }
                return item //push the item into the new array
            })
            setTodoList(newList) // set the new list
        } catch (error) {
            console.log(error)
        }
    }

    // after the => it automatically return, whenever it returns true it stays in the list if it returns false it get removes from the list
   async function handleDeleteTodo(id, deleteObj) {
    try{
         await axios.delete(`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/todo/delete-todo/${id}`, deleteObj)
        const newList = todoList.filter(item => item._id !== id)
        setTodoList(newList)
    }catch(error){
        console.log(error)
    }
   }


async function addTodo(event) {
    try {
    event.preventDefault() // will prevent page from refreshing
    if (textInput === '') {
        return
    }
    const response = await axios.post(`${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/todo/create-todo`, {text: textInput})
    setTodoList([...todoList, response.data.payload])  //instead of pushing use the spread operator-- this is how we .push to change a state--the new .push
    setTextInput('')
} catch (error){
    console.log(error)
}
}
return (
    //PARENT ELEMENT
    <div>
        <div className='form-div'>
            <form onSubmit={e => addTodo(e)}>
                <input
                    //textbox
                    type='text'
                    name='todoInput'
                    value={textInput}
                    onChange={event => setTextInput(event.target.value)}
                />
                {/* //button/submit */}
                <button type='submit'>Submit</button>
            </form>
        </div>
        {/* //List => */}
        <div className='todo-div'>
            <ul>
                {
                    todoList.map((todo) => {
                        return <Todo key={todo._id} todo={todo} handleChangeIsDone={handleChangeIsDone} handleEditTodo={handleEditTodo} 
                        handleDeleteTodo={handleDeleteTodo}/>
                        //checkbox for done or line through

                    })
                }
            </ul>
        </div>
    </div>
)
}


export default TodoList