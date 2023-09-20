import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/video-converter';
const pageTitle =
  'Free Online Video to Audio Converter: Extract Audio from Videos Easily';
const pageDescription =
  'Convert your videos to audio files for free with our online video to audio converter tool. No download required, no sign-up required. Supports wide range of video formats i.e MP4, MKV, WEBM, AVI, OGM.';
const imageUrl = `${environment.screenshotsBaseUrl}/video-converter.png`;

const keywords =
  'online video to audio converter,extract audio from videos,convert video to audio,convert video to MP3,reduce video file size,free video to audio converter,no download required,supports multiple video formats,high-quality MP3 files,easy to use,choose video format,check audio quality,choose audio format for needs,create podcasts,create audiobooks,listen to audio from videos';
export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online Video to Audio Converter: Extract Audio from Videos Easily',
  subHeading: 'Convert Videos to Audio For Free',
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
  tags: keywords.split(',').map(word => word.trim()),
  icons: [
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
      displayText: AppDisplayNames.SCREEN_RECORDER,
      iconName: 'screen-icon',
      navigateUrl: '/tools/screen-recorder',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'Why Use an Online Video to Audio Converter?',
    listData: [
      'To extract the audio from a video. This can be useful for creating podcasts, audiobooks, or simply for listening to the audio from a video without having to watch the video.',
      'To convert a video to a different audio format. For example, you might want to convert a video to MP3 format so that you can listen to it on your MP3 player.',
      'To reduce the file size of a video. Audio files are typically smaller than video files, so converting a video to audio can help to reduce the file size and make it easier to share or store.',
    ],
  },
  {
    heading: 'Features of Our Online Video to Audio Converter Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Convert your videos to audio directly from your web browser.',
      'Supports multiple video formats. Convert MP4, AVI, MOV, WEBM, and other popular video formats to audio.',
      'Converts videos to high-quality MP3 files. Our converter uses advanced algorithms to extract the audio from your videos in high quality.',
      'Easy to use. Simply upload your video and click the "Convert" button.',
    ],
  },
  {
    heading: 'How to Use Our Online Video to Audio Converter Tool',
    listData: [
      'Go to our website and click the "Upload Video" button.',
      'Select the video you want to convert to audio.',
      'Click the "Convert" button.',
      'Download your converted audio file.',
    ],
  },
  {
    heading: 'Tips for Using an Online Video to Audio Converter',
    listData: [
      'Choose a video that is in a supported format. Our converter supports a wide range of video formats, but it is always best to check to make sure that your video is in a supported format before uploading it.',
      'Make sure that your video has a good audio quality. The quality of the converted audio file will depend on the quality of the audio in the original video. If the original video has poor audio quality, the converted audio file will also have poor audio quality.',
      'Choose the right audio format for your needs. If you are converting a video to audio to listen to it on your MP3 player, you will want to choose the MP3 audio format. If you are converting a video to audio to create a podcast, you might want to choose the AAC audio format.',
    ],
  },
  {
    blockData: [
      'Our free online video to audio converter tool is a great way to extract the audio from your videos easily. It is easy to use and supports multiple video formats. With our converter, you can create podcasts, audiobooks, or simply listen to the audio from your videos without having to watch the video.',
    ],
  },
];
