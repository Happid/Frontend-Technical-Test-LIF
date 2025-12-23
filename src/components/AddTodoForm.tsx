import { type FormEvent, useState } from "react";
import { useTodoStore } from "../store/todoStore.ts";

const AddTodoForm = () => {
  const { addTodo, loading } = useTodoStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    await addTodo({
      title,
      description: description || undefined,
    });

    // reset form
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Todo</h3>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default AddTodoForm;
