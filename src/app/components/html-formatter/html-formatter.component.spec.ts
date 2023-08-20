import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlFormatterComponent } from './html-formatter.component';

describe('HtmlFormatterComponent', () => {
  let component: HtmlFormatterComponent;
  let fixture: ComponentFixture<HtmlFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlFormatterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HtmlFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
