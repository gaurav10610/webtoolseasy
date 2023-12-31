import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoToAudioConverterComponent } from './video-to-audio-converter.component';

describe('VideoToAudioConverterComponent', () => {
  let component: VideoToAudioConverterComponent;
  let fixture: ComponentFixture<VideoToAudioConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoToAudioConverterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoToAudioConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
