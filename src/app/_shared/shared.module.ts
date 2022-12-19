import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";

const components = [SearchBarComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class SharedModule {}
