import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

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
    {
      iconName: 'json-icon',
      iconRelativeUrl: 'json-icon.svg',
    },
    {
      iconName: 'js-icon',
      iconRelativeUrl: 'js-icon.svg',
    },
    {
      iconName: 'css-icon',
      iconRelativeUrl: 'css.svg',
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
      applicationId: 'cssformatter',
      displayText: 'CSS Formatter',
      iconName: 'css-icon',
      navigateUrl: '/tools/css-formatter',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use HTML Formatter/Beautifier',
    listData: [
      `Paste unformatted/minified HTML in unformatted HTML block and HTML will be formatted automatically.`,
      `HTML formatting is being done in host browser only.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their HTML with just pasting it here.`,
      `Real-time formatting: Our tool formats your HTML in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your HTML into our platform and get a clean, organized, and optimized result.`,
    ],
  },
  {
    heading: 'Why Choose Our Online HTML Formatter Tool?',
    listData: [
      `Improves readability: Clean and organized HTML is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized HTML makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
];
