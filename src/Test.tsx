import { useState } from "react";
import type { UpdateTodoRequest } from "./api/todoApi.ts";

const Test = ({ todo }: any) => {
  const [form, setForm] = useState<UpdateTodoRequest>({
    title: "",
    description: "",
    completed: false,
  });

  const handleChange = (e: any) => {
    console.log(e.target.name, e.target.value);

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <input
      type="text"
      name="title"
      id="title"
      value={todo.title}
      onChange={handleChange}
    />
  );
};

export default Test;
