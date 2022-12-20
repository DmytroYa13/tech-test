import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from "./pipes/search.pipe";
import { LoaderComponent } from "./components/loader/loader.component";
import { EmptyStateComponent } from "./components/empty-state/empty-state.component";

const components = [
  SearchBarComponent,
  SearchPipe,
  LoaderComponent,
  EmptyStateComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, ...components],
})
export class SharedModule {}
