import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/screen-recorder';
const pageTitle = 'Free Screen Recorder: Record Your Screen with Audio, Webcam';
const pageDescription =
  'Record your screen with audio and webcam for free with our online screen recorder. Record screen with no watermark and no time limit. No sign-up required.';
const imageUrl = `${environment.screenshotsBaseUrl}/screen-recorder.png`;

const keywords =
  'online screen recorder,free screen recorder,screen recorder with audio,screen recorder with webcam,screen recorder for tutorials,screen recorder for demos,screen recorder for video lectures,screen recorder for webinars,screen recorder for gameplay,screen recorder for Windows,screen recorder for Mac,screen recorder for Chromebook,screen recorder for Linux, no watermark, no time limit screen recording';

const relatedTools: ApplicationIds[] = [ApplicationIds.VIDEO_CONVERTER];

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online Screen Recorder - Record Your Screen with Audio, Webcam',
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
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:site', content: '@webtoolseasy' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: imageUrl },
  ],
  tags: keywords.split(',').map(word => word.trim()),
  icons: [
    {
      iconName: 'screen-icon',
      iconRelativeUrl: 'screen.svg',
    },
  ],
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'Why Use a Screen Recorder?',
    listData: [
      'To create tutorials and demos. Screen recorders are a great way to create tutorials and demos of how to use software or complete a task.',
      'To record video lectures and webinars. Screen recorders can be used to record video lectures and webinars for students or clients to watch later.',
      'To record gameplay. Screen recorders are also popular for recording gameplay footage to share with friends or online communities.',
    ],
  },
  {
    heading: 'Features of Our Online Screen Recorder',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Record your screen directly from your web browser.',
      'Record screen, audio, and webcam. Capture everything on your screen, as well as your audio and webcam.',
      'Easy to use. Simply click the "Start Recording" button and start recording.',
      'Record Your Screen Without Watermark or Time Limit',
      `Save your recordings to your computer. Once you're finished recording, you can save your recording to your computer.`,
    ],
  },
  {
    heading: 'How to Use Our Online Screen Recorder',
    listData: [
      'Go to our website and click the "Start Recording" button.',
      'Select the area of the screen you want to record.',
      'Choose whether you want to record audio and/or webcam.',
      'Click the "Start Recording" button to begin recording.',
      `Click the "Stop Recording" button when you're finished recording.`,
      'Save your recording to your computer.',
    ],
  },
  {
    heading: 'Tips for Using a Screen Recorder',
    listData: [
      'Choose the right recording mode. There are different recording modes available, such as full screen, custom region, and window. Choose the recording mode that best suits your needs.',
      `Use a high-quality microphone. If you're recording audio, make sure to use a high-quality microphone to ensure good sound quality.`,
      `Edit your recordings. Once you're finished recording, you can edit your recordings to remove any unwanted footage or add annotations.`,
      `Share your recordings online. Once you're happy with your recordings, you can share them online with others on social media or video sharing platforms.`,
    ],
  },
  {
    blockData: [
      'Our free online screen recorder is a great way to record your screen with audio and webcam. It is easy to use, no download required, and no sign-up required. With our screen recorder, you can create tutorials and demos, record video lectures and webinars, record gameplay, and more.',
    ],
  },
];
