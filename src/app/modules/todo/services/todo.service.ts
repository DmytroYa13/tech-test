import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable } from "rxjs";
import { TodoInputType } from "../types/todo-input.type";
import { TodoInterface } from "../types/todo.interface";
import { map, take, tap } from "rxjs/operators";
import { FireBaseResponseInterface } from "src/app/_shared/types/fire-base-response.interface";
import { FireBasePostResponse } from "src/app/_shared/types/fire-base-post-response.interface";
import { API_URL } from "src/app/_shared/injectionTokens/api-url.token";
import { TodoStateService } from "./todo-state.service";

@Injectable()
export class TodoService {
  private readonly apiUrl: string;

  constructor(
    private http: HttpClient,
    private todoStateService: TodoStateService,
    @Optional() @Inject(API_URL) apiUrl?: string
  ) {
    this.apiUrl = apiUrl ? `${apiUrl}/todo` : "";
  }

  getTodos() {
    this.http
      .get<TodoInterface[]>(`${this.apiUrl}.json`)
      .pipe(take(1), map(this.prepareFireBaseResponse))
      .subscribe((todos: TodoInterface[]) =>
        this.todoStateService.setTodoList(todos.reverse())
      );
  }

  getTodoById(id: string): Observable<TodoInterface> {
    return this.http.get<TodoInterface>(`${this.apiUrl}/${id}.json`).pipe(
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
      .post<FireBasePostResponse>(`${this.apiUrl}.json`, newTodo)
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
    return this.http.patch<any>(`${this.apiUrl}/${id}.json`, updatedTodo).pipe(
      take(1),
      map((response) => ({
        ...response,
        id,
      }))
    );
  }
  deleteTodo(id: string): Observable<TodoInterface> {
    return this.http.delete<TodoInterface>(`${this.apiUrl}/${id}.json`);
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
