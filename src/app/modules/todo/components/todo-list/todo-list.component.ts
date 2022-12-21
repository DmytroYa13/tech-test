import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { TodoStateService } from "../../services/todo-state.service";
import { TodoService } from "../../services/todo.service";
import { TodoInterface } from "../../types/todo.interface";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
})
export class TodoListComponent implements OnInit {
  todoList$: Observable<TodoInterface[]>;
  todoSearchLabel: string = "";

  todoById = (index: number, item: TodoInterface) => item.id;

  constructor(
    public todoService: TodoService,
    private todoStateService: TodoStateService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.todoList$ = this.todoStateService.getTodoList$;
  }

  fetchData(): void {
    this.todoService.getTodos();
  }

  onSearch(searchValue: string): void {
    this.todoSearchLabel = searchValue;
  }

  deleteTodo(id: string): void {
    this.todoService
      .deleteTodo(id)
      .pipe(take(1))
      .subscribe(() => {
        this.todoStateService.filterTodoList(id);
      });
  }

  toggleDone(todo: TodoInterface): void {
    const updatedBody = {
      done: !todo.done,
      updatedAt: new Date(),
    };

    this.todoService
      .updateTodo(updatedBody, todo.id)
      .pipe(take(1))
      .subscribe(() => {
        this.todoStateService.updateTodoList({ ...updatedBody, id: todo.id });
      });
  }
}
