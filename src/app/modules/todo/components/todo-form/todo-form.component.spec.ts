import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
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
      imports: [ReactiveFormsModule],
      declarations: [TodoFormComponent],
      providers: [
        { provide: TodoService, useValue: fakeTodoService },
        { provide: TodoStateService, useValue: fakeTodoStateService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.todoForm.reset();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form", () => {
    expect(component.todoForm).toBeTruthy();
  });

  it("should render input elements", () => {
    const compiled = fixture.debugElement.nativeElement;

    const labelInput = compiled.querySelector('input[formcontrolname="label"]');
    const descriptionTextarea = compiled.querySelector(
      'textarea[formcontrolname="description"]'
    );
    const categoryEmail = compiled.querySelector(
      'input[formcontrolname="category"]'
    );
    const inputElements = compiled.querySelectorAll("input");
    const textareaElements = compiled.querySelectorAll("textarea");

    expect(labelInput).toBeTruthy();
    expect(descriptionTextarea).toBeTruthy();
    expect(categoryEmail).toBeTruthy();
    expect(inputElements.length).toEqual(2);
    expect(textareaElements.length).toEqual(1);
  });

  it("form invalid when empty", () => {
    expect(component.todoForm.valid).toBeFalsy();
  });

  it("label field validity", () => {
    let errors: any = {};
    let label = component.todoForm.controls["label"];
    expect(label.valid).toBeFalsy();

    errors = label.errors || {};
    expect(errors["required"]).toBeTruthy();

    label.setValue("11");
    errors = label.errors || {};
    expect(errors["required"]).toBeFalsy();

    label.setValue("123456789");
    errors = label.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("should be valid if fields are filled", () => {
    expect(component.todoForm.valid).toBeFalsy();
    component.todoForm.controls["label"].setValue("test");
    component.todoForm.controls["description"].setValue("test");
    component.todoForm.controls["category"].setValue("test");
    expect(component.todoForm.valid).toBeTruthy();
  });

});
