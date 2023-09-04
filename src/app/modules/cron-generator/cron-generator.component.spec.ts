import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronGeneratorComponent } from './cron-generator.component';

describe('CronGeneratorComponent', () => {
  let component: CronGeneratorComponent;
  let fixture: ComponentFixture<CronGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CronGeneratorComponent],
    });
    fixture = TestBed.createComponent(CronGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
