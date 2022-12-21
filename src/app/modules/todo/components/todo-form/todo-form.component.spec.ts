import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoStateService } from "../../services/todo-state.service";
import { TodoService } from "../../services/todo.service";

import { TodoFormComponent } from "./todo-form.component";

describe("TodoFormComponent", () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  const fakeTodoService = jasmine.createSpyObj("TodoService", [
    "updateTodo",
    "postTodo",
  ]);
  const fakeTodoStateService = jasmine.createSpyObj("TodoStateService", [
    "updateTodoList",
    "addToTodoList",
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      providers: [
        { provide: TodoService, useValue: fakeTodoService },
        { provide: TodoStateService, useValue: fakeTodoStateService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
