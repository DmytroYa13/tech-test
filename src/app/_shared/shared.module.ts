import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from "./pipes/search.pipe";

const components = [SearchBarComponent, SearchPipe];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, ...components],
})
export class SharedModule {}
