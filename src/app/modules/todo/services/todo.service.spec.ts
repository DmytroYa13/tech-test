import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TodoService } from "./todo.service";
import { API_URL } from "src/app/_shared/injectionTokens/api-url.token";
import { TodoStateService } from "./todo-state.service";
import { TodoInterface } from "../types/todo.interface";

const fakeTodo: TodoInterface = {
  label: "label",
  description: "description",
  category: "category",
  done: false,
  id: "0",
};

describe("TodoService", () => {
  let todoService: TodoService;
  let todoStateService: TodoStateService;
  let httpTestingController: HttpTestingController;

  const fakeTodoStateService = jasmine.createSpyObj("TodoStateService", [
    "setTodoList",
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoService,
        { provide: API_URL, useValue: "http://localhost:4200/api" },
        { provide: TodoStateService, useValue: fakeTodoStateService },
      ],
    });
    todoService = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(todoService).toBeTruthy();
  });

  it("apiUrl should be defined", () => {
    const apiUrl = TestBed.inject(API_URL);
    expect(todoService["apiUrl"]).toBe(`${apiUrl}/todo`);
  });

  it("should PATCH todo data", () => {
    const changes: Partial<TodoInterface> = {
      label: "new label",
    };
    const id = "111";

    todoService.updateTodo(changes, id).subscribe((result) => {
      expect(result?.label).toBe("new label");
    });

    const req = httpTestingController.expectOne(
      "http://localhost:4200/api/todo/111.json"
    );
    expect(req.request.method).toEqual("PATCH");

    req.flush({
      ...fakeTodo,
      ...changes,
    });
  });

  it("should DELETE todo data", () => {
    const id = "111";

    todoService.deleteTodo(id).subscribe((result) => {
      expect(result).toBe(null);
    });

    const req = httpTestingController.expectOne(
      "http://localhost:4200/api/todo/111.json"
    );
    expect(req.request.method).toEqual("DELETE");

    req.flush(null);
  });

  it("should POST todo data", () => {
    let newTodo: TodoInterface = { ...fakeTodo };
    delete newTodo.id;

    todoService.postTodo(newTodo).subscribe((result) => {
      expect(result).toBeDefined();
    });

    const req = httpTestingController.expectOne(
      "http://localhost:4200/api/todo.json"
    );
    expect(req.request.method).toEqual("POST");

    req.flush({
      ...newTodo,
    });
  });
});
