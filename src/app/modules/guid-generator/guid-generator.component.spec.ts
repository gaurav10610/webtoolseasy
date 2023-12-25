import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidGeneratorComponent } from './guid-generator.component';

describe('GuidGeneratorComponent', () => {
  let component: GuidGeneratorComponent;
  let fixture: ComponentFixture<GuidGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidGeneratorComponent],
    });
    fixture = TestBed.createComponent(GuidGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
