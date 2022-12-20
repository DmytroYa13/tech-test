import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoWrapperComponent } from './create-todo-wrapper.component';

describe('CreateTodoWrapperComponent', () => {
  let component: CreateTodoWrapperComponent;
  let fixture: ComponentFixture<CreateTodoWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTodoWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
