import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/crop-image';
const pageTitle =
  'Crop Images Online For Free | Crop Photos | Crop JPG, PNG, WEBP, BMP';
const pageDescription =
  'Crop your images/photos/pictures online for free. Crop your JPG, PNG, WEBP, BMP or GIF images and download in multiple supported formats.';
const imageUrl = `${environment.screenshotsBaseUrl}/image-cropper.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Crop JPG, PNG, WEBP, BMP For Free',
  subHeading: 'Crop Image Online',
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
    listData: [
      'Drag & drop or select image files (JPEG, PNG, WEBP, BMP only) to crop.',
      'Once selected images apprears in uploaded images section then select any uploaded image to crop',
      'In crop and preview section, use drag and move freehand select area section from image cropper tool to crop certion portion from selected image/photo.',
      'Realtime preview of cropped portion of the selected image will be updated everytime the crop area is dragged or moved.',
      'Use output format dropdown to select the output format of cropped image.',
      'Use download button to download cropped image in desired format.',
    ],
  },
  {
    heading: 'What is Image Cropping?',
    blockData: [
      `Image cropping is a common image processing technique that involves selecting a portion of an image while discarding the rest. Essentially, it's like cutting out a specific section of an image, removing everything outside of the selected area. This process allows you to focus on a particular subject or area of interest within the image and can serve several purposes`,
    ],
  },
  {
    heading: 'Why would you want to Crop Images/Photos?',
    listData: [
      `Composition: Cropping can help improve the composition of an image by removing distracting or irrelevant elements. This can make the main subject more prominent and aesthetically pleasing.`,
      `Emphasis: You can use cropping to emphasize a specific part of the image, drawing the viewer's attention to that area. This is often done in portrait photography to highlight a person's face.`,
      `Resizing: Cropping can be used to resize an image without changing its resolution. For example, you can crop a large image to create a smaller version while maintaining the same pixel density.`,
      `Aspect Ratio Adjustment: Cropping allows you to change the aspect ratio of an image. For example, you can convert a rectangular image into a square by cropping it accordingly.`,
      `Eliminating Unwanted Content: If there are unwanted objects or artifacts in the image, cropping can be used to remove them.`,
      `Zooming In: Cropping can simulate a zooming effect, making a distant subject appear closer by removing the surrounding area.`,
    ],
  },
  {
    heading: 'Key Features',
    listData: [
      `Upload and Import: The ability to upload images directly from your device.`,
      `Crop Selection: Tools for selecting the area of the image you want to keep. This can include rectangular, square, freeform, or aspect ratio-specific cropping options.`,
      `Preview: A preview of the cropped image to visualize how it will look after cropping.`,
      `Save and Download: The ability to save the cropped image in various formats (e.g., JPEG, PNG, WEBP or BMP) and download it to your device or share it directly on social media platforms.`,
      `Privacy and Security: Assurance that uploaded images are handled securely and that your data and edited images are protected as the whole processing will be done in client browser only.`,
      `User-Friendly Interface: An intuitive and user-friendly interface with easy-to-understand controls and instructions.`,
      `Mobile-Friendly: Compatibility with mobile devices, enabling users to crop images on smartphones and tablets.`,
    ],
  },
];
