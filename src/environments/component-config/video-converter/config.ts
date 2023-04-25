import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Video Converter',
  subHeading: 'Convert Videos For Free',
  navigationUrl: '/tools/video-converter',
  pageTitle: 'Free Video Converter - Convert Video to MP4, WEBM, MP3 and More',
  metaTags: [
    {
      name: 'description',
      content:
        'This is a free online video converter tool that lets you convert video files. Change the video format to MP4, WEBM, MP3, OGV, OPUS and more. Convert your videos straight from your browser.',
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
    {
      iconName: 'screen-icon',
      iconRelativeUrl: 'screen.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'screen-recorder',
      displayText: 'Screen Recorder',
      iconName: 'screen-icon',
      navigateUrl: '/tools/screen-recorder',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use Video Converter Tool?',
    listData: [
      `Drag & drop or select video files to convert.`,
      `All video files will be listed. An error will be shown for invalid file types.`,
      `For converting videos either use convert button corresponding to the video file or use convert all button.`,
      `Default target format for all videos will be MP3 (Audio) and it can be changed via dropdown corresponding to each video file.`,
      `Use download button corresponding to a video file to download converted video.`,
      `Use download zip button to download all converted videos at once.`,
    ],
  },
  {
    heading: 'What is the need of a Video Converter Tool?',
    listData: [
      `Compatibility: Different devices and applications often support different video formats. By using an online video conversion tool, you can convert your video file into a format that is compatible with the device or application you want to use it on.`,
      `File size: Large video files can take up a lot of storage space on your device or take a long time to upload or download. By using a video conversion tool, you can reduce the file size of your video without compromising on quality, making it easier to store and share.`,
      `Editing: If you need to edit a video, you may need to convert it into a different format to work with the editing software you're using. An online video conversion tool can help you convert your video file into a format that's compatible with your editing software.`,
      `Sharing: Different social media platforms and websites often have different requirements for video formats and file sizes. An online video conversion tool can help you convert your video into the appropriate format and size for sharing on different platforms.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Video conversion is 100% free`,
      `Video conversion is 100% secure as whole processing is being done at client side only (in host browser)`,
      `Unlimited videos can be converted for free`,
      `Supports wide range of input video formats - MP4, WEBM, OGV, MKV, OGM`,
      `Supports wide range of output media formats - MP3, OGG, OPUS, AAC, MP4 x264, MP4 x265, WEBM, OGV`,
    ],
  },
];
