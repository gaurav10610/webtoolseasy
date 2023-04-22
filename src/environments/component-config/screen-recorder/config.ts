import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Screen Recorder',
  subHeading: 'Free Online Screen Recorder',
  navigationUrl: '/tools/screen-recorder',
  pageTitle: 'Free Screen Recorder | Screen Capture',
  metaTags: [
    {
      name: 'description',
      content:
        'Free Screen Recorder | Screen Capture | Screen Record On Mac | Screen Recorder Windows 10 | Windows Screen Recorder',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'screen recorder',
    'screen capture',
    'screen record on mac',
    'screen recorder windows 10',
    'windows screen recorder',
  ],
  icons: [
    {
      iconName: 'app-icon',
      iconRelativeUrl: 'app-icon.svg',
    },
    {
      iconName: 'linkedin-icon',
      iconRelativeUrl: 'linkedin-icon.svg',
    },
    {
      iconName: 'facebook-icon',
      iconRelativeUrl: 'facebook.svg',
    },
    {
      iconName: 'screen-icon',
      iconRelativeUrl: 'screen.svg',
    },
    {
      iconName: 'video-convert-icon',
      iconRelativeUrl: 'video-convert.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'videoconverter',
      displayText: 'Video Converter',
      iconName: 'video-convert-icon',
      navigateUrl: '/tools/video-converter',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use screen recorder',
    listData: [
      `To include mic audio & camera video in the recorded video, use checkboxes`,
      `Start screen recording using start recording button`,
      `When asked for mic & camera permission then provide the same`,
      `Camera video if included will appear at bottom right corner in the recorded video in 150X150 px box`,
      `Screen recording can be stopped via native stop recording button or use stop recording button on the screen (button will appear once recording starts)`,
      `Once recording is stopped then recorded video will be downloaded automatically`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Screen recording is 100% free`,
      `Unlimited screen recording in HD format`,
      `Record screen with camera video & mic audio`,
      `No watermark in recorded video`,
      `No software installation is needed to record screen`,
      `Screen recording is 100% secure as whole processing is being done at client side only (in host browser)`,
    ],
  },
];
