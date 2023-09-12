import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UuidVersion4GeneratorComponent } from './uuid-version4-generator.component';

describe('UuidVersion4GeneratorComponent', () => {
  let component: UuidVersion4GeneratorComponent;
  let fixture: ComponentFixture<UuidVersion4GeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UuidVersion4GeneratorComponent]
    });
    fixture = TestBed.createComponent(UuidVersion4GeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
