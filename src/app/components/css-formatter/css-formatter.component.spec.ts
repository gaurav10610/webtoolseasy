import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssFormatterComponent } from './css-formatter.component';

describe('CssFormatterComponent', () => {
  let component: CssFormatterComponent;
  let fixture: ComponentFixture<CssFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssFormatterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
