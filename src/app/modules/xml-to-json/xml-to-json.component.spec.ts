import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlToJsonComponent } from './xml-to-json.component';

describe('XmlToJsonComponent', () => {
  let component: XmlToJsonComponent;
  let fixture: ComponentFixture<XmlToJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XmlToJsonComponent],
    });
    fixture = TestBed.createComponent(XmlToJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
