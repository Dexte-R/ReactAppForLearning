import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { uuid } from 'uuidv4';

function App() {
  const [todos, setTodos] = useState([])
  const refTodo = useRef(todos)

  useEffect(() => {
    console.log("App started running")
  }, [])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = refTodo.current.value  
    if (name === '') return null
    setTodos(currentTodos => {
      return [...currentTodos, { id: uuid(), name: name, complete: false}]
    })
    refTodo.current.value = null
  }

  function removeCompleted() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  async function getTodoFromSpringBoot() {
    const id = refTodo.current.value  
    if (id === '') return null

    const data = { bodyText: "TodoItem sent to server via POST request. This todoitem is in the JSON format and the server should be able to receive this JSON object and convert it into a POJO automatically." }
    const requestOptions = {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    let todoItemFromServer = await fetch("http://localhost:8090/" + id, requestOptions).then(res => res.json()).then(res => {return res})
    setTodos(currentTodos => {
      return [...currentTodos, { id: uuid(), name: todoItemFromServer.bodyText, complete: false}]
    })
    refTodo.current.value = null
  }

  return (
    <>
      <TodoList todoList={todos} toggleTodo={toggleTodo} />
      <input ref={refTodo} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={getTodoFromSpringBoot}>Add Todo From SpringBoot</button>
      <button onClick={removeCompleted}>Clear completed</button>
      <div style={{backgroundColor:"white",color:"red"}}>{todos.filter(todo => !todo.complete).length} left to do</div>
      <div style={{backgroundColor:"white",color:"red"}}>Additional todo item fetched from SpringBoot server</div>
    </>
  );
}

export default App;