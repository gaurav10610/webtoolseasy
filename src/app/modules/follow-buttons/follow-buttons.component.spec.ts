import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowButtonsComponent } from './follow-buttons.component';

describe('FollowButtonsComponent', () => {
  let component: FollowButtonsComponent;
  let fixture: ComponentFixture<FollowButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowButtonsComponent],
    });
    fixture = TestBed.createComponent(FollowButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
