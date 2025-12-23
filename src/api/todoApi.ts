import api from "./axios";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title: string;
  description?: string;
  completed: boolean;
}

export const getTodosApi = async (): Promise<Todo[]> => {
  const { data } = await api.get<Todo[]>("/api/todos");
  return data;
};

export const createTodoApi = async (
  payload: CreateTodoRequest,
): Promise<Todo> => {
  const { data } = await api.post<Todo>("/api/todos", payload);
  return data;
};

export const updateTodoApi = async (
  id: number,
  payload: UpdateTodoRequest,
): Promise<Todo> => {
  const { data } = await api.put<Todo>(`/api/todos/${id}`, payload);
  return data;
};

export const deleteTodoApi = async (id: number): Promise<void> => {
  await api.delete(`/api/todos/${id}`);
};
