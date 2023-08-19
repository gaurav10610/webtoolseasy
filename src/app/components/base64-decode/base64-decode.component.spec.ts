import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64DecodeComponent } from './base64-decode.component';

describe('Base64DecodeComponent', () => {
  let component: Base64DecodeComponent;
  let fixture: ComponentFixture<Base64DecodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Base64DecodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Base64DecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
