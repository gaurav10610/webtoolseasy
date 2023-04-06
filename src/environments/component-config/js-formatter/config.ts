import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'JS Formatter',
  subHeading: 'Online JS Beautifier',
  navigationUrl: '/tools/js-formatter',
  pageTitle: 'JS Formatter | JS Beautifier',
  metaTags: [
    {
      name: 'description',
      content:
        'JS Formatter | JS Beautifier | Javascript Formatter | String Format Javascript | Javascript Prettify',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'js formatter',
    'js beautifier',
    'string format javascript',
    'javascript prettify',
    'javascript formatter',
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
