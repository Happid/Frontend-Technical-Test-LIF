import Header from "../components/Header.tsx";
import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore.ts";
import AddTodoForm from "../components/AddTodoForm.tsx";
import TodoItem from "../components/TodoItem.tsx";
import { useAuthStore } from "../store/authStore.ts";

const TodoPage = () => {
  const { todos, fetchTodos } = useTodoStore();
  const { username } = useAuthStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Header />

      <main className="mb-5 px-4">
        <div className="mx-auto max-w-2xl pt-28 pb-5">
          <div className="text-center pb-5">
            <div className="text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">
              Welcome Back <span className="text-purple-600">{username}</span>
            </div>
            <h1 className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Todo Apps
            </h1>
            <p className="mt-3 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Fullstack using reactjs, javaspring boot and mysql
            </p>
          </div>
          <AddTodoForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </main>
    </>
  );
};

export default TodoPage;
