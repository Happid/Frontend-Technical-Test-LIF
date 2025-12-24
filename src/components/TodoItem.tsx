import { useTodoStore } from "../store/todoStore";
import type { Todo, UpdateTodoRequest } from "../api/todoApi.ts";
import { useState } from "react";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { updateTodo, deleteTodo, loading } = useTodoStore();
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<UpdateTodoRequest>({
    title: todo?.title ?? "",
    description: todo?.description ?? "",
    completed: todo?.completed ?? false,
  });

  const handleUpdate = async () => {
    await updateTodo(todo.id, {
      ...form,
      title: form.title,
      description: form.description,
      completed: form.completed,
    });
    setIsEdit(!isEdit);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this todo?")) return;
    await deleteTodo(todo.id);
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggle = (e: any) => {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <>
      <div>
        {isEdit ? (
          <div className="w-full p-4 border border-default rounded-md shadow-xs bg-white flex flex-col space-y-2">
            <div
              onClick={() => setIsEdit(!isEdit)}
              className="flex justify-end hover:text-purple-600 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 18.75 7.5-7.5 7.5 7.5"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              value={form.title}
              onChange={handleChange}
              disabled={loading}
            />
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleChange}
              disabled={loading}
            />
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                name="completed"
                id="completed"
                checked={form.completed}
                onChange={handleToggle}
                disabled={loading}
              />
              <div className="relative w-9 h-5 bg-gray-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-400"></div>
              <span className="text-sm ml-2">
                {todo.completed ? "Done" : "On Progress"}
              </span>
            </label>
            <div className="grid grid-col-1 md:grid-cols-2 gap-2">
              <button
                className="w-full text-white bg-red-600 hover:opacity-90 cursor-pointer shadow-xs leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="w-full text-white bg-blue-600 hover:opacity-90 cursor-pointer shadow-xs leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`min-h-[262px] p-4 border border-default rounded-md shadow-xs ${todo.completed ? "bg-green-100" : "bg-white"}`}
          >
            <div className="flex justify-between">
              <div
                onClick={() => setIsEdit(true)}
                className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8"
              >
                {todo.title}
              </div>
              <div>
                <svg
                  onClick={handleDelete}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:text-red-600 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <p onClick={() => setIsEdit(true)} className="text-body">
              {todo.description}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoItem;
