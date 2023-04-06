import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'JSON Formatter',
  subHeading: 'Online JSON Beautifier',
  navigationUrl: '/tools/json-formatter',
  pageTitle: 'JSON Formatter | JSON Beautifier',
  metaTags: [
    {
      name: 'description',
      content:
        'JSON Formatter | JSON Beautifier | Best JSON Formatter | JSON Formatter Online | JSON',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'json formatter',
    'json beautifier',
    'best json formatter',
    'json formatter online',
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
