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
  todoSearchLabel: string = 'test'

  todoById = (index: number, item: TodoInterface) => item.id;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.todoList$ = this.todoService.getTodos();
  }

  onSearch(searchValue: string): void {
    console.log('search', searchValue);
  }
}
