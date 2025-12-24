import { type FormEvent, useEffect, useRef, useState } from "react";
import { useTodoStore } from "../store/todoStore.ts";
import toast from "react-hot-toast";

const AddTodoForm = () => {
  const { addTodo, loading, error, success } = useTodoStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    await addTodo({
      title,
      description: description || undefined,
    });
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  }, [error, success]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          ref={titleRef}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
        />
      </div>

      <div className="mb-3">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={250}
        />
      </div>

      <button
        className="w-full text-white bg-purple-600 hover:opacity-90 cursor-pointer shadow-xs leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};

export default AddTodoForm;
