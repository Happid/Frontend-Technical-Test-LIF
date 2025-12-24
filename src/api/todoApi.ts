import api from "./axios";

interface ApiResponse<T> {
  data: T;
}

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
  const { data } = await api.get<ApiResponse<Todo[]>>("/api/todos");
  return data.data;
};

export const createTodoApi = async (
  payload: CreateTodoRequest,
): Promise<Todo> => {
  const { data } = await api.post<ApiResponse<Todo>>("/api/todos", payload);
  return data.data;
};

export const updateTodoApi = async (
  id: number,
  payload: UpdateTodoRequest,
): Promise<Todo> => {
  const { data } = await api.put<ApiResponse<Todo>>(
    `/api/todos/${id}`,
    payload,
  );
  return data.data;
};

export const deleteTodoApi = async (id: number): Promise<void> => {
  await api.delete(`/api/todos/${id}`);
};
