import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-create-todo-wrapper",
  templateUrl: "./create-todo-wrapper.component.html",
  styleUrls: ["./create-todo-wrapper.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoWrapperComponent {
  isFormOpened: boolean = false;
}
