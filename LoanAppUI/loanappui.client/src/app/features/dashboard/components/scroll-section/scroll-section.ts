import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-scroll-section',
  styleUrl: './scroll-section.css',
  templateUrl: './scroll-section.html',
})
export class ScrollSection {
  protected readonly scrollEvent = output<void>();

  public readonly enableScrollToTop = input(false);
  public readonly sectionTitle = input.required<string>();
  public readonly sectionSubtitle = input<string>("");

  protected emitScrollEvent() {
    this.scrollEvent.emit();
  }
}
