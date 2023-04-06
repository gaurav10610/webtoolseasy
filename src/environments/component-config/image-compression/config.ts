import { ApplicationConfig } from 'src/app/@types/config';

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
