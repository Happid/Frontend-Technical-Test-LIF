import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore.ts";

const TodoPage = () => {
  const { todos, fetchTodos, loading, error } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <main>
        <h2>My Todos</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} - {todo.completed ? "Done" : "Pending"}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default TodoPage;
