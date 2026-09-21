import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-scroll-snap-section',
  styleUrl: './scroll-snap-section.css',
  templateUrl: './scroll-snap-section.html',
})
export class ScrollSnapSection {
  protected readonly scrollEvent = output<void>();

  public readonly enableScrollToTop = input(false);
  public readonly sectionTitle = input.required<string>();
  public readonly sectionSubtitle = input<string>("");

  protected emitScrollEvent() {
    this.scrollEvent.emit();
  }
}
