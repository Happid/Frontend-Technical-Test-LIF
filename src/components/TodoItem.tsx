import { useTodoStore } from "../store/todoStore";
import type { Todo } from "../api/todoApi.ts";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { updateTodo, loading } = useTodoStore();

  const handleToggle = async () => {
    await updateTodo(todo.id, {
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={loading}
      />

      <span>
        {todo.title}
        {todo.completed && " ✔"}
      </span>
    </li>
  );
};

export default TodoItem;
