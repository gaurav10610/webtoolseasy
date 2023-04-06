import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Video Converter',
  subHeading: 'Convert Videos For Free',
  navigationUrl: '/tools/video-converter',
  pageTitle: 'Video Converter | Convert Videos For Free',
  metaTags: [
    {
      name: 'description',
      content:
        'video converter | mp4 to mp3 | webm to mp4 | mp4 to webm | video to audio',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'video converter',
    'mp4 to mp3',
    'webm to mp4',
    'mp4 to webm',
    'mkv to mp4',
    'video to audio',
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
      iconName: 'video-convert-icon',
      iconRelativeUrl: 'video-convert.svg',
    },
    {
      iconName: 'settings-icon',
      iconRelativeUrl: 'settings.svg',
    },
    {
      iconName: 'download-icon',
      iconRelativeUrl: 'download.svg',
    },
    {
      iconName: 'play-icon',
      iconRelativeUrl: 'play-icon.svg',
    },
  ],
};
