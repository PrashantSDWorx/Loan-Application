import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollSnapSection } from './scroll-snap-section';

describe('ScrollSnapSection', () => {
  let component: ScrollSnapSection;
  let fixture: ComponentFixture<ScrollSnapSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollSnapSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollSnapSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
