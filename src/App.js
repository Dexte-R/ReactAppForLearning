import React, { useState, useRef } from 'react';
import TodoList from './TodoList';
import { uuid } from 'uuidv4';

function App() {
  const [todos, setTodos] = useState([])
  const refTodo = useRef(todos)

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

    const data = { bodyText: "TodoItem sent to server via POST request" }
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
    <div>
      <TodoList todoList={todos} toggleTodo={toggleTodo} />
      <input ref={refTodo} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={getTodoFromSpringBoot}>Add Todo From SpringBoot</button>
      <button onClick={removeCompleted}>Clear completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <div>Additional todo item fetched from SpringBoot server</div>
    </div>
  );
}

export default App;