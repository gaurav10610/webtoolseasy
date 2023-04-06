import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Text File Difference',
  subHeading: 'Compare Text Files Online',
  navigationUrl: '/tools/text-compare',
  pageTitle: 'Text Compare | Compare Text Online',
  metaTags: [
    {
      name: 'description',
      content:
        'Text Difference Checker | Diff checker online | Text Compare | File Compare | Compare Files Online | Diff Tool',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'diff checker',
    'text to compare',
    'text compare online',
    'file diff',
    'text difference checker',
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
  ],
};
