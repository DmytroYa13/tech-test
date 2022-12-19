import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TodoInputType } from "../types/todo-input.type";
import { TodoInterface } from "../types/todo.interface";
import { map, take } from "rxjs/operators";
import { FireBaseResponseInterface } from "src/app/_shared/types/fire-base-response.interface";
import { FireBasePostResponse } from "src/app/_shared/types/fire-base-post-response.interface";

@Injectable()
export class TodoService {
  private readonly API_URL = `${environment.apiUrl}/todo`;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoInterface[]> {
    return this.http
      .get<TodoInterface[]>(`${this.API_URL}.json`)
      .pipe(take(1), map(this.prepareFireBaseResponse));
  }

  getTodoById(id: string): Observable<TodoInterface> {
    return this.http.get<TodoInterface>(`${this.API_URL}/${id}.json`).pipe(
      take(1),
      map((response: TodoInterface) => {
        if (response) {
          return { ...response, id };
        }
        return null;
      })
    );
  }

  postTodo(newTodo: TodoInputType): Observable<TodoInterface> {
    return this.http
      .post<FireBasePostResponse>(`${this.API_URL}.json`, newTodo)
      .pipe(
        take(1),
        map((response: FireBasePostResponse) => ({
          ...newTodo,
          id: response.name,
        }))
      );
  }

  updateTodo(
    updatedTodo: Partial<TodoInputType>,
    id: string
  ): Observable<TodoInterface> {
    return this.http.patch<TodoInterface>(
      `${this.API_URL}/${id}.json`,
      updatedTodo
    );
  }

  deleteTodo(id: number): Observable<TodoInterface> {
    return this.http.delete<TodoInterface>(`${this.API_URL}/${id}.json`);
  }

  private prepareFireBaseResponse(
    response: FireBaseResponseInterface
  ): TodoInterface[] {
    if (!response) {
      return [];
    } else {
      return Object.keys(response).map((key: string) => ({
        ...response[key],
        id: key,
      }));
    }
  }
}
