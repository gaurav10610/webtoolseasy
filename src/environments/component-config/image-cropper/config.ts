import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/crop-image';
const pageTitle = 'Free Online Image Cropper: Crop Your Photos Online for Free';
const pageDescription =
  'Crop your images online for free with our easy-to-use image cropper. No download required, no sign-up required. Crop JPG, PNG, WEBP, BMP For Free.';
const imageUrl = `${environment.screenshotsBaseUrl}/image-cropper.png`;

const keywords =
  'free image cropper,online image cropper,crop images online,crop JPEG images,crop PNG images,crop GIF images,crop BMP images,image cropping,image composition,image aspect ratio,social media image cropping,website image cropping,remove unwanted parts of an image,resize an image,create a square image';

const relatedTools: ApplicationIds[] = [ApplicationIds.IMAGE_COMPRESSOR];

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Free Online Image Cropper: Crop JPG, PNG, WEBP, BMP Images',
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
  icons: [],
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'Why Use an Image Cropper?',
    listData: [
      'To remove unwanted parts of an image. This can be useful for improving the composition of an image or for removing distracting elements.',
      'To resize an image to a specific size. This can be useful for sharing images on social media or for using images on a website.',
      'To create a square image. Square images are often preferred for social media platforms and for sharing on mobile devices.',
    ],
  },
  {
    heading: 'Features of Our Free Online Image Cropper',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Crop your images directly from your web browser.',
      'Supports multiple image formats. Crop JPEG, PNG, GIF, and BMP images.',
      'Easy to use. Simply upload your image and drag the crop box to the desired size and location.',
      'Save your cropped images in the desired format.',
    ],
  },
  {
    heading: 'How to Use Our Free Online Image Cropper',
    listData: [
      'Go to our website and click the "Upload Image" button.',
      'Select the image you want to crop.',
      'Drag the crop box to the desired size and location.',
      'Click the "Crop Image" button.',
      'Save your cropped image.',
    ],
  },
  {
    heading: 'Tips for Using an Image Cropper',
    listData: [
      'Consider the composition of your image. When cropping an image, it is important to consider the composition. Try to crop your image in a way that highlights the most important elements and creates a balanced and visually appealing image.',
      'Use the crop ratio tool. Many image croppers have a crop ratio tool that allows you to crop your image to a specific aspect ratio. This can be useful for cropping images for social media or for using images on a website.',
      'Save a copy of the original image. Before cropping your image, it is a good idea to save a copy of the original image. This way, you can always go back to the original image if you are not happy with the cropped image.',
    ],
  },
  {
    blockData: [
      'Our free online image cropper is a great way to crop your images online for free. It is easy to use and supports multiple image formats. With our image cropper, you can remove unwanted parts of an image, resize an image to a specific size, or create a square image.',
    ],
  },
];
