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

  return (
    <div>
      <TodoList todoList={todos} toggleTodo={toggleTodo} />
      <input ref={refTodo} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={removeCompleted}>Clear completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;