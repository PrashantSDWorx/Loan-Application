import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSettingsPage } from './dashboard-settings-page';

describe('DashboardSettingsPage', () => {
  let component: DashboardSettingsPage;
  let fixture: ComponentFixture<DashboardSettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSettingsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSettingsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
