import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/_shared/shared.module';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoLayoutComponent } from './components/todo-layout/todo-layout.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';



@NgModule({
  declarations: [
    TodoItemComponent,
    TodoListComponent,
    TodoLayoutComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class TodoModule { }
