import React, { useState } from "react";
import "../css/todo.css";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

function TodoItem({ todo, onDeleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(todo.content);

  const save = () => {
    onUpdateTodo(todo.id, editedContent);
    setIsEditing(false);
  };

  const cancel = () => {
    setEditedContent(todo.content);
    setIsEditing(false);
  };

  return (
    <div className="todo-card">
      {isEditing ? (
        <input
          type="text"
          className="todo-edit-input"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <span className="todo-text">{todo.content}</span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <FaCheck className="todo-icon check" onClick={save} />
            <FaTimes className="todo-icon cancel" onClick={cancel} />
          </>
        ) : (
          <FaEdit
            className="todo-icon edit"
            onClick={() => {
              setEditedContent(todo.content);
              setIsEditing(true);
            }}
          />
        )}
        <FaTrash
          className="todo-icon delete"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>
    </div>
  );
}

export default TodoItem;
