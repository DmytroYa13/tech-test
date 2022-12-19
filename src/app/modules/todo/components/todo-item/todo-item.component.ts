import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { TodoInterface } from "../../types/todo.interface";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoInterface;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}

  onToggleDone(id: string): void {}

  editTodo(id: string): void {}

  deleteTodo(id: string): void {}
}
