import "./App.css";
import TodoCreate from "./components/TodoCreate";
import TodoList from "./components/TodoList";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const createTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  const deleteTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };
  const updateTodo = (id, newContent) => {
    todos.map((todo) => {
      if (todo.id === id) {
        todo.content = newContent;
      } else {
        return todo;
      }
    });
  };

  console.log(todos);

  return (
    <div className="todo-container">
      <TodoCreate onCreateTodo={createTodo} />
      <TodoList
        onDeleteTodo={deleteTodo}
        todos={todos}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
