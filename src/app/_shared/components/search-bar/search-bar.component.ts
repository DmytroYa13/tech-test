import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil, debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() searchEvent = new EventEmitter<string>();
  unsubscribe$ = new Subject<void>();
  searchControl: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.initializeControl();
    this.subscribeToSearchChanges();
  }

  initializeControl(): void {
    this.searchControl = new FormControl(null);
  }

  subscribeToSearchChanges(): void {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(500), distinctUntilChanged())
      .subscribe((searchVal: string) => {
        searchVal === ""
          ? this.searchEvent.emit(null)
          : this.searchEvent.emit(searchVal);
      });
  }

  onClearClick(): void {
    this.searchControl.setValue('');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
