import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { LoaderService } from "./_shared/services/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "tech-test";
  loading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.loading$ = this.loaderService.loading$;
  }
}
