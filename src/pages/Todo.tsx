import Header from "../components/Header.tsx";
import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore.ts";
import AddTodoForm from "../components/AddTodoForm.tsx";
import TodoItem from "../components/TodoItem.tsx";

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
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default TodoPage;
