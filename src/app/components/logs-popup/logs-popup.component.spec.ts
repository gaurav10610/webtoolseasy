import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsPopupComponent } from './logs-popup.component';

describe('LogsPopupComponent', () => {
  let component: LogsPopupComponent;
  let fixture: ComponentFixture<LogsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogsPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
