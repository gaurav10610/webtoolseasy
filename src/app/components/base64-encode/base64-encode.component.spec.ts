import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64EncodeComponent } from './base64-encode.component';

describe('Base64EncodeComponent', () => {
  let component: Base64EncodeComponent;
  let fixture: ComponentFixture<Base64EncodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Base64EncodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Base64EncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
