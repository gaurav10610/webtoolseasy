import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UuidVersion1GeneratorComponent } from './uuid-version1-generator.component';

describe('UuidVersion1GeneratorComponent', () => {
  let component: UuidVersion1GeneratorComponent;
  let fixture: ComponentFixture<UuidVersion1GeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UuidVersion1GeneratorComponent],
    });
    fixture = TestBed.createComponent(UuidVersion1GeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
