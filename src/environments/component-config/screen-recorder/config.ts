import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/screen-recorder';
const pageTitle = 'Free Online Screen Recorder | Online Video Recorder';
const pageDescription =
  'Easily Capture your Screen via Best Free Online Screen Recorder with or without audio, video from microphone and webcam | No download, No Watermark with Lag free recording for PCs ( Windows/ MAC/ Ubuntu )';
const imageUrl = `${environment.screenshotsBaseUrl}/screen-recorder.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Screen Recorder',
  subHeading: 'Record Screen With Audio, Video for Free',
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
      iconName: 'screen-icon',
      iconRelativeUrl: 'screen.svg',
    },
    {
      iconName: 'video-convert-icon',
      iconRelativeUrl: 'video-convert.svg',
    },
    {
      iconName: 'share-fb',
      iconRelativeUrl: 'share-fb.svg',
    },
    {
      iconName: 'share-linkedin',
      iconRelativeUrl: 'share-linkedin.svg',
    },
    {
      iconName: 'share-twitter',
      iconRelativeUrl: 'share-twitter.svg',
    },
    {
      iconName: 'share-copy',
      iconRelativeUrl: 'share-copy.svg',
    },
    {
      iconName: 'home-icon',
      iconRelativeUrl: 'home.svg',
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
      `Screen recording is 100% free.`,
      `Unlimited screen recording in HD format.`,
      `Record screen with camera video & mic audio.`,
      `No watermark in the recorded video.`,
      `Easy to use: No software installation is needed to record screen.`,
      `Cross platform: tool is completely web-based and can be accessed wherever you are, from any computer. It is compatible with all major browsers and OSes, including Windows, macOS, and Linux.`,
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
