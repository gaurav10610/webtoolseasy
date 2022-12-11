import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressSettingsComponent } from './compress-settings.component';

describe('CompressSettingsComponent', () => {
  let component: CompressSettingsComponent;
  let fixture: ComponentFixture<CompressSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompressSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompressSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
