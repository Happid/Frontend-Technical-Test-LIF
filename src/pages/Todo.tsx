import Header from "../components/Header.tsx";
import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore.ts";
import AddTodoForm from "../components/AddTodoForm.tsx";

const TodoPage = () => {
  const { todos, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>My Todos</h2>
        <AddTodoForm />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? "Done" : "Pending"}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default TodoPage;
