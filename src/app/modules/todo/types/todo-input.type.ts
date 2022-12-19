import { TodoInterface } from "./todo.interface";

export type TodoInputType = Omit<TodoInterface, "id">;
