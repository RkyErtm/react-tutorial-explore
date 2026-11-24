import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onDeleteTodo, onUpdateTodo }) {
  return (
    <>
      {todos &&
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
    </>
  );
}

export default TodoList;
