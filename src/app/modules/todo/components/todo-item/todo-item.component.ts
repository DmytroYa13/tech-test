import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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

  @Output() deleteTodoEvent = new EventEmitter<string>();
  @Output() toggleDoneEvent = new EventEmitter<TodoInterface>();

  isExpanded: boolean = false;
  isEditMode: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onToggleDone(): void {
    this.toggleDoneEvent.emit(this.todo);
  }

  deleteTodo(id: string): void {
    this.deleteTodoEvent.emit(id);
  }
}
