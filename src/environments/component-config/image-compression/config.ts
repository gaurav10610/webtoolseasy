import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Image Compressor',
  subHeading: 'Compress JPEG, PNG images for free',
  navigationUrl: '/tools/image-compress',
  pageTitle: 'Image Compressor | Image File Size Reducer',
  metaTags: [
    {
      name: 'description',
      content:
        'Image Compressor | Image Size Reducer | Image File Size Reducer | JPG Size Reducer | PNG Size Reducer | Compress JPEG | Compress PNG',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'image compressor',
    'image size reducer',
    'jpg size reducer',
    'png size reducer',
    'compress jpeg',
    'compress png',
  ],
  icons: [
    {
      iconName: 'app-icon',
      iconRelativeUrl: 'app-icon.svg',
    },
    {
      iconName: 'image-file-icon',
      iconRelativeUrl: 'image-file.svg',
    },
    {
      iconName: 'download-icon',
      iconRelativeUrl: 'download.svg',
    },
    {
      iconName: 'settings-icon',
      iconRelativeUrl: 'settings.svg',
    },
    {
      iconName: 'play-icon',
      iconRelativeUrl: 'play-icon.svg',
    },
    {
      iconName: 'linkedin-icon',
      iconRelativeUrl: 'linkedin-icon.svg',
    },
    {
      iconName: 'facebook-icon',
      iconRelativeUrl: 'facebook.svg',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to compress images',
    listData: [
      `Drag & drop or select image files ( jpeg, png only ) to compress.`,
      `All image files will be listed. An error will be shown for invalid file types ( files other than jpeg, png ).`,
      `For compressing images either use compress button corresponding to the image file or use compress all button.`,
      `By default images will be compressed by 20% of their original size. Use settings button to customize compression level.`,
      `Use download button corresponding to an image file to download compressed image.`,
      `Use download zip button to download all compressed images at once.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to compress their images with just a few clicks.`,
      `High-quality compression: Our tool uses advanced compression algorithms to reduce image file size while preserving image quality.`,
      `Batch processing: Compress multiple images at once, saving you time and effort.`,
      `Supports JPEG and PNG formats: Our tool works with both JPEG and PNG image formats, providing versatile compression options.`,
      `No need to download any software. Simply upload your images to our platform and get your compressed images in no time.`,
    ],
  },
  {
    heading: 'What is image compression?',
    blockData: [
      `Image compression is the process of reducing the file size of a digital image without significantly impacting its quality. The goal of image compression is to make images smaller in size, so they can be stored, transmitted, and processed more efficiently. This can be especially important for website owners, as large image files can slow down the website's loading time, affecting the user experience.`,
      `There are two main types of image compression: lossless and lossy. Lossless compression reduces the file size of an image without losing any image data, while lossy compression reduces the file size by discarding some image data. Lossy compression is generally used for images that contain a lot of redundant information, such as photographs, where some loss in quality is acceptable to achieve a smaller file size.`,
      `JPEG and PNG are two of the most common image formats used for image compression. JPEG uses lossy compression and is suitable for photographs, while PNG uses lossless compression and is best for images with sharp lines and flat areas of color, such as graphics and illustrations.`,
      `Overall, image compression is an important technique for optimizing images and making them faster to load and easier to handle.`,
    ],
  },
  {
    heading: 'Disclaimer',
    blockData: [
      'Only JPEG & PNG image can be compressed as of now. Image compression is being done locally in browser only.',
    ],
  },
];
