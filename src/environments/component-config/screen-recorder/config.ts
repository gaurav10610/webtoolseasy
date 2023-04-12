import { ApplicationConfig } from 'src/app/@types/config';

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
