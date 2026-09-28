import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollSection } from './scroll-section';

describe('ScrollSection', () => {
  let component: ScrollSection;
  let fixture: ComponentFixture<ScrollSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
