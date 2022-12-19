import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TodoInputType } from "../types/todo-input.type";
import { TodoInterface } from "../types/todo.interface";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private API_URL = "";

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(this.API_URL);
  }

  getTodoById(id: number): Observable<TodoInterface> {
    return this.http.get<TodoInterface>(`${this.API_URL}/${id}`);
  }

  postTodo(newTodo: TodoInputType): Observable<TodoInterface> {
    return this.http.post<TodoInterface>(this.API_URL, newTodo);
  }

  updateTodo(
    updatedTodo: Partial<TodoInputType>,
    id: number
  ): Observable<TodoInterface> {
    return this.http.patch<TodoInterface>(`${this.API_URL}/${id}`, updatedTodo);
  }

  deleteTodo(id: number): Observable<TodoInterface> {
    return this.http.delete<TodoInterface>(`${this.API_URL}/${id}`);
  }
}
