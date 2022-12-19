import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TodoInputType } from "../../types/todo-input.type";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit {
  @Output() newTodoEvent = new EventEmitter<TodoInputType>();

  todoForm: FormGroup;

  private get formData() {
    return this.todoForm.value;
  }

  get label(): AbstractControl {
    return this.todoForm.get("label");
  }

  get description(): AbstractControl {
    return this.todoForm.get("description");
  }

  get category(): AbstractControl {
    return this.todoForm.get("category");
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.todoForm = new FormGroup({
      label: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
    });
  }

  clearForm(): void {
    this.todoForm.reset();
  }

  postNewTodo(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo: TodoInputType = {
      label: this.formData.label,
      description: this.formData.description,
      category: this.formData.category,
      done: false,
    };

    this.newTodoEvent.emit(newTodo);
  }
}
