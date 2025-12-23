import { useTodoStore } from "../store/todoStore";
import type { Todo } from "../api/todoApi.ts";
import { useState } from "react";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { updateTodo, deleteTodo, loading } = useTodoStore();
  const [isEdit, setIsEdit] = useState(false);

  const handleToggle = async () => {
    await updateTodo(todo.id, {
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleDelete = async () => {
    if (!confirm("Delete this todo?")) return;
    await deleteTodo(todo.id);
  };

  return (
    <>
      <div onClick={() => setIsEdit(!isEdit)}>
        {isEdit ? (
          <li style={{ cursor: "pointer", background: "lightgray" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              disabled={loading}
            />
            <label>Done</label>
            <br />

            <input type="text" value={todo.title} disabled={loading} />
            <br />
            <textarea value={todo.description} disabled={loading} />
            <span>{todo.completed && " ✔"}</span>
            <br />
            <button>Update</button>
            <button onClick={handleDelete}>Delete</button>
            <br />
          </li>
        ) : (
          <li style={{ cursor: "pointer", background: "lightgray" }}>
            <label>Done</label>
            <span>{todo.title}</span>
            <br />
            <span>{todo.description}</span>
            <span>{todo.completed && " ✔"}</span>
          </li>
        )}
      </div>
    </>
  );
};

export default TodoItem;
