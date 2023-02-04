import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolHeadingComponent } from './tool-heading.component';

describe('ToolHeadingComponent', () => {
  let component: ToolHeadingComponent;
  let fixture: ComponentFixture<ToolHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolHeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
