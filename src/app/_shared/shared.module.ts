import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from "./pipes/search.pipe";
import { LoaderComponent } from "./components/loader/loader.component";
import { EmptyStateComponent } from "./components/empty-state/empty-state.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "./interceptors/loader";
import { environment } from "src/environments/environment";
import { API_URL } from "./injectionTokens/api-url.token";

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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
  ],
})
export class SharedModule {}
