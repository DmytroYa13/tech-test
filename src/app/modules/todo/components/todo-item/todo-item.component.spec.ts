import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoInterface } from '../../types/todo.interface';

import { TodoItemComponent } from './todo-item.component';

const fakeTodo: TodoInterface = {
  label: "label",
  description: "description",
  category: "category",
  done: false,
  id: "0",
};

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete when delete is clicked', () => {
    const deleteSpy = spyOn(component.deleteTodoEvent, 'emit')
    component.deleteTodo('11')
    expect(deleteSpy).toHaveBeenCalled()
  })

  it('should emit toggle when delete is clicked', () => {
    const deleteSpy = spyOn(component.toggleDoneEvent, 'emit')
    component.onToggleDone()
    expect(deleteSpy).toHaveBeenCalled()
  })

});
