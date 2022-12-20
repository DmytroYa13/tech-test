import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-empty-state",
  templateUrl: "./empty-state.component.html",
  styleUrls: ["./empty-state.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() text: string | null = null
}
