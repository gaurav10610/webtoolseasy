import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'HTML Formatter',
  subHeading: 'Online HTML Beautifier',
  navigationUrl: '/tools/html-formatter',
  pageTitle: 'HTML Formatter | HTML Beautify',
  metaTags: [
    {
      name: 'description',
      content:
        'HTML Formatter | HTML Beautify | HTML Formatter Online | HTML Code Formatter',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'html formatter',
    'html beautify',
    'fhtml formatter online',
    'html code formatter',
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
