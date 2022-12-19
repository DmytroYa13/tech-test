import { Component, OnInit } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { TodoInputType } from "../../types/todo-input.type";

@Component({
  selector: "app-todo-layout",
  templateUrl: "./todo-layout.component.html",
  styleUrls: ["./todo-layout.component.scss"],
})
export class TodoLayoutComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  postTodo(newTodo: TodoInputType): void {
    this.todoService.postTodo(newTodo).subscribe((response) => {
      console.log("response", response);
    });
  }
}
