import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedToolsComponent } from './related-tools.component';

describe('RelatedToolsComponent', () => {
  let component: RelatedToolsComponent;
  let fixture: ComponentFixture<RelatedToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedToolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
