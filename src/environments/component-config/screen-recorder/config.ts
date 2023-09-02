import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/screen-recorder';
const pageTitle = 'Free Screen Recorder With No Watermark | No Time Limit';
const pageDescription =
  'Easy HD Screen recording via our Best Free Online Screen Recorder with or without audio, video from mic and webcam. No watermark and time limit for screen recording.';
const imageUrl = `${environment.screenshotsBaseUrl}/screen-recorder.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Screen Recorder',
  subHeading: 'HD Screen Recording With Mic & Camera',
  navigationUrl,
  pageTitle,
  metaTags: [
    {
      name: 'description',
      content: pageDescription,
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
    {
      property: 'og:title',
      content: pageTitle,
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${environment.hostname}${navigationUrl}` },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:secure_url', content: imageUrl },
    { property: 'og:description', content: pageDescription },
    { property: 'og:site_name', content: 'WebToolsEasy' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:site', content: '@webtoolseasy' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: imageUrl },
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
      displayText: AppDisplayNames.VIDEO_CONVERTER,
      iconName: 'video-convert-icon',
      navigateUrl: '/tools/video-converter',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use Screen Recorder?',
    listData: [
      `To include mic audio & camera video in the recorded video, use provided checkboxes.`,
      `Start screen recording using start recording button.`,
      `When asked for mic & camera permission then provide the same.`,
      `Camera video if included will appear at bottom right corner in the recorded video in 150X150 px box.`,
      `Screen recording can be stopped via native stop recording button or use stop recording button on the screen (button will appear once recording starts).`,
      `Once recording is stopped then recorded video will be downloaded automatically.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Screen recording is 100% free. No registration required. No credit card required.`,
      `Unlimited screen recording in HD format i.e no time limit for recording.`,
      `Record screen with webcam video & microphone audio.`,
      `Pause and resume screen recording.`,
      `HD screen recording with no watermark.`,
      `Easy to use: No software installation is needed to record screen.`,
      `Cross platform: Tool is completely web-based and can be accessed wherever you are, from any computer. It is compatible with all major browsers and OSes, including Windows, macOS, and Linux.`,
      `Secure: Screen recording is 100% secure as whole processing is being done at client side only (in host browser) and we don't store any video.`,
    ],
  },
  {
    heading: 'Disclaimer',
    blockData: [
      'Recorded video will be in WEBM format. To convert in some other format like MP4 you can use our video converter tool to convert the recorded video.',
    ],
  },
];
