import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from "../types/todo.interface";

@Injectable()
export class TodoStateService {
  private todoList$ = new BehaviorSubject<TodoInterface[] | null>(null);
  getTodoList$ = this.todoList$.asObservable();

  constructor() {}

  setTodoList(todos: TodoInterface[]): void {
    this.todoList$.next(todos);
  }

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
}
