import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoStateService } from '../../services/todo-state.service';
import { TodoService } from '../../services/todo.service';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const fakeTodoService = jasmine.createSpyObj("TodoService", [
    "getTodos",
    "deleteTodo",
    "updateTodo",
  ]);
  const fakeTodoStateService = jasmine.createSpyObj("TodoStateService", [
    "updateTodoList",
    "filterTodoList",
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        { provide: TodoService, useValue: fakeTodoService },
        { provide: TodoStateService, useValue: fakeTodoStateService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
