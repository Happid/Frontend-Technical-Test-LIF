import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { useEffect } from "react";
import { getTodosApi } from "../api/todoApi.ts";

const TodoPage = () => {
  useEffect(() => {
    getTodosApi().then(console.log).catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1>Todo Page</h1>
      </main>
      <Footer />
    </>
  );
};

export default TodoPage;
