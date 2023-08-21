import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools/image-compress';
const pageTitle = 'Best Online Image Compressor, Image File Size Reducer';
const pageDescription =
  'Online Image Compressor is the Best Image Optimzer Tool to Compress your images in JPEG and PNG formats to the minimum possible size for free.';
const imageUrl = `${environment.screenshotsBaseUrl}/image-compressor.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Image Compressor',
  subHeading: 'Compress JPEG, PNG images for free',
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
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to Compress Images using Image Compressor Tool?',
    listData: [
      `Drag & drop or select image files (JPEG, PNG only) to compress.`,
      `All image files will be listed. An error will be shown for invalid file types (files other than JPEG, PNG).`,
      `For compressing images either use compress button corresponding to the image file or use compress all button.`,
      `By default images will be compressed by 20% of their original size. Use settings button to customize compression level.`,
      `Use download button corresponding to an image file to download compressed image.`,
      `Use download zip button to download all compressed images at once.`,
    ],
  },
  {
    heading: 'What is Image Compression?',
    blockData: [
      `Image compression is the process of reducing the file size of a digital image without significantly impacting its quality. The goal of image compression is to make images smaller in size, so they can be stored, transmitted, and processed more efficiently. This can be especially important for website owners, as large image files can slow down the website's loading time, affecting the user experience.`,
      `There are two main types of image compression: lossless and lossy. Lossless compression reduces the file size of an image without losing any image data, while lossy compression reduces the file size by discarding some image data. Lossy compression is generally used for images that contain a lot of redundant information, such as photographs, where some loss in quality is acceptable to achieve a smaller file size.`,
      `JPEG and PNG are two of the most common image formats used for image compression. JPEG uses lossy compression and is suitable for photographs, while PNG uses lossless compression and is best for images with sharp lines and flat areas of color, such as graphics and illustrations.`,
      `Overall, image compression is an important technique for optimizing images and making them faster to load and easier to handle.`,
    ],
  },
  {
    heading: 'Why would you want to Compress Images?',
    blockData: [
      `The objective of image compression is to reduce irrelevance and redundancy of the image data to be able to store or transmit data in an efficient form. It is concerned with minimizing the number of bits required to represent an image. Image compression may be lossy or lossless.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to compress their images with just a few clicks.`,
      `High-quality compression: Our tool uses advanced compression algorithms to reduce image file size while preserving image quality.`,
      `Batch processing: Compress multiple images at once, saving you time and effort.`,
      `Supports JPEG and PNG formats: Our tool works with both JPEG and PNG image formats, providing versatile compression options.`,
      `Secure: Image compression will be performed in host browser only. We don't store any of the images.`,
      `No need to download any software. Simply upload your images to our platform and get your compressed images in no time.`,
    ],
  },
  {
    heading: 'Disclaimer',
    blockData: ['Only JPEG & PNG image can be compressed as of now.'],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about Image Compression at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Image_compression',
      },
      {
        displayText: 'Disadvantages and Advantages of Image Compression',
        url: 'https://www.techwalla.com/articles/disadvantages-and-advantages-of-image-compression',
      },
      {
        displayText: 'Read more about JPEG format at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/JPEG#:~:text=JPEG%20(%2F%CB%88d%CA%92e%C9%AAp,storage%20size%20and%20image%20quality.',
      },
      {
        displayText: 'Read more about PNG format at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/PNG',
      },
    ],
  },
];
