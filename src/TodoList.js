import React from 'react'

export default function TodoList({ todoList, toggleTodo }) {
    return (
        todoList.map(todo => {
            function handleTodoClick() {
                toggleTodo(todo.id)
            }
            return (
                <div key={todo.id}>
                    <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                    {todo.name}
                </div>
            );
        })
    );
}
