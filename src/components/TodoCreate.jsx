import "../css/todo.css";
import { useState } from "react";

function TodoCreate({ onCreateTodo }) {
  const [newTodo, setNewTodo] = useState("");
  const createTodo = () => {
    if (!newTodo) return;

    const request = {
      id: Math.floor(Math.random() * 99999999),
      content: newTodo,
    };
    onCreateTodo(request);
    setNewTodo("");
  };

  return (
    <div>
      <h1 className="todo-title">Todo List</h1>

      <div className="todo-form">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          placeholder="Add a new todo"
          className="todo-input"
        />
        <button onClick={createTodo} className="todo-add-button">
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoCreate;
