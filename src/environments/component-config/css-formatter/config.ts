import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'CSS Formatter',
  subHeading: 'Online CSS Beautifier',
  navigationUrl: '/tools/css-formatter',
  pageTitle: 'CSS Formatter | CSS Beautifier',
  metaTags: [
    {
      name: 'description',
      content:
        'CSS Formatter | CSS Beautifier | CSS Prettify | CSS Formatter Online | CSS Beautifier Online',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'css formatter',
    'css beautifier',
    'css prettify',
    'css formatter online',
    'css beautifier online',
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
    {
      iconName: 'json-icon',
      iconRelativeUrl: 'json-icon.svg',
    },
    {
      iconName: 'js-icon',
      iconRelativeUrl: 'js-icon.svg',
    },
    {
      iconName: 'html-icon',
      iconRelativeUrl: 'html.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'jsformatter',
      displayText: 'JS Formatter',
      iconName: 'js-icon',
      navigateUrl: '/tools/js-formatter',
    },
    {
      applicationId: 'jsonformatter',
      displayText: 'JSON Formatter',
      iconName: 'json-icon',
      navigateUrl: '/tools/json-formatter',
    },
    {
      applicationId: 'htmlformatter',
      displayText: 'HTML Formatter',
      iconName: 'html-icon',
      navigateUrl: '/tools/html-formatter',
    },
  ],
};
