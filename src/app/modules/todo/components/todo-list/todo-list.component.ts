import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
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

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.todoList$ = this.todoService.getTodoList$;
  }

  fetchData(): void {
    this.todoService.getTodos();
  }

  onSearch(searchValue: string): void {
    console.log("search", searchValue);
  }
}
