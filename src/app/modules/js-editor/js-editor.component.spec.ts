import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsEditorComponent } from './js-editor.component';

describe('JsEditorComponent', () => {
  let component: JsEditorComponent;
  let fixture: ComponentFixture<JsEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsEditorComponent]
    });
    fixture = TestBed.createComponent(JsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
