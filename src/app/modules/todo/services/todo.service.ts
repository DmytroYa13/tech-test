import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { TodoInputType } from "../types/todo-input.type";
import { TodoInterface } from "../types/todo.interface";
import { map, take, tap } from "rxjs/operators";
import { FireBaseResponseInterface } from "src/app/_shared/types/fire-base-response.interface";
import { FireBasePostResponse } from "src/app/_shared/types/fire-base-post-response.interface";

const FAKE_DATA: TodoInterface[] = [
  {
    id: "1",
    label: "label1",
    description: "description1",
    category: "category1",
    done: false,
  },
  {
    id: "2",
    label: "label2",
    description: "description2",
    category: "category2",
    done: true,
  },
  {
    id: "3",
    label: "label3",
    description: "description3",
    category: "category3",
    done: true,
  },
];

@Injectable()
export class TodoService {
  private readonly API_URL = `${environment.apiUrl}/todo`;

  private todoList$ = new BehaviorSubject<TodoInterface[]>([]);

  constructor(private http: HttpClient) {}

  getTodoList$ = this.todoList$.asObservable();

  updateTodoList(todo: Partial<TodoInterface>): void {
    const dataCopy = this.todoList$.getValue().map((item: TodoInterface) => {
      if (item.id === todo.id) {
        return { ...item, ...todo };
      }
      return item;
    });

    this.todoList$.next(dataCopy);
  }

  addToTodoList(todo: TodoInterface): void {
    this.todoList$.next([todo, ...this.todoList$.getValue()]);
  }

  filterTodoList(id: string): void {
    this.todoList$.next(
      this.todoList$.getValue().filter((item: TodoInterface) => item.id !== id)
    );
  }

  getTodos() {
    this.http
      .get<TodoInterface[]>(`${this.API_URL}.json`)
      .pipe(take(1), map(this.prepareFireBaseResponse))
      .subscribe((todos: TodoInterface[]) => this.todoList$.next(todos.reverse()));
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
    return this.http.patch<any>(`${this.API_URL}/${id}.json`, updatedTodo).pipe(
      take(1),
      map((response) => ({
        ...response,
        id,
      }))
    );
  }
  deleteTodo(id: string): Observable<TodoInterface> {
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
