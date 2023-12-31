import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtDecoderComponent } from './jwt-decoder.component';

describe('JwtDecoderComponent', () => {
  let component: JwtDecoderComponent;
  let fixture: ComponentFixture<JwtDecoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JwtDecoderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JwtDecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
