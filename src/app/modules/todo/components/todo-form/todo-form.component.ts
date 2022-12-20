import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { take } from "rxjs/operators";
import { TodoService } from "../../services/todo.service";
import { TodoInputType } from "../../types/todo-input.type";
import { TodoInterface } from "../../types/todo.interface";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit {
  @Input() todo: TodoInterface | null = null;
  @Output() closeFormEvent = new EventEmitter<void>();

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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.todoForm = new FormGroup({
      label: new FormControl(this.todo ? this.todo.label : null, [
        Validators.required,
      ]),
      description: new FormControl(this.todo ? this.todo.description : null, [
        Validators.required,
      ]),
      category: new FormControl(this.todo ? this.todo.category : null, [
        Validators.required,
      ]),
    });
  }

  postNewTodo(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const todoBody: TodoInputType = {
      label: this.formData.label,
      description: this.formData.description,
      category: this.formData.category,
      done: false,
    };

    if (this.todo) {
      this.todoService
        .updateTodo({ ...todoBody, updatedAt: new Date() }, this.todo.id)
        .pipe(take(1))
        .subscribe((response) => {
          this.todoService.updateTodoList(response);
          this.onCloseForm();
        });
    } else {
      this.todoService
        .postTodo({ ...todoBody, createdAt: new Date() })
        .pipe(take(1))
        .subscribe((response) => {
          this.todoService.addToTodoList(response);
          this.onCloseForm();
        });
    }
  }

  onCloseForm() {
    this.todoForm.reset();
    this.closeFormEvent.emit();
  }
}
