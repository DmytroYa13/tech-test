import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TodoService } from "./todo.service";
import { API_URL } from "src/app/_shared/injectionTokens/api-url.token";
import { TodoStateService } from "./todo-state.service";

describe("TodoService", () => {
  let service: TodoService;
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
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
