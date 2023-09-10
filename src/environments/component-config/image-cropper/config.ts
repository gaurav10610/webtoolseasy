import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/crop-image';
const pageTitle = 'Crop Images Online For Free | Crop Photo | Crop JPG, PNG';
const pageDescription =
  'Crop your images/photos online for free. Crop your JPG, PNG, WEBP, BMP or GIF images by dragging the corners of a crop box.';
const imageUrl = `${environment.screenshotsBaseUrl}/image-croppper.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Crop JPG, PNG, WEBP, BMP For Free',
  subHeading: 'Crop Photos Online',
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
    'photo cutting',
    'crop photo',
    'crop image',
    'crop image online',
    'crop picture online',
    'crop and image',
  ],
  icons: [
    {
      iconName: 'image-icon',
      iconRelativeUrl: 'image-icon.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'imagecompress',
      displayText: AppDisplayNames.IMAGE_COMPRESSOR,
      iconName: 'image-icon',
      navigateUrl: '/tools/image-compress',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to Crop Image/Photo using Image Cropper Tool?',
    listData: [],
  },
  {
    heading: 'What is Image Cropping?',
    listData: [],
  },
  {
    heading: 'Why would you want to Crop Images/Photos?',
    listData: [],
  },
  {
    heading: 'Key Features',
    listData: [],
  },
  {
    heading: 'References',
    links: [],
  },
];
