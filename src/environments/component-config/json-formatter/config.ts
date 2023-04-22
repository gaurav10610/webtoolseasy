import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

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
    {
      iconName: 'js-icon',
      iconRelativeUrl: 'js-icon.svg',
    },
    {
      iconName: 'html-icon',
      iconRelativeUrl: 'html.svg',
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
      applicationId: 'htmlformatter',
      displayText: 'HTML Formatter',
      iconName: 'html-icon',
      navigateUrl: '/tools/html-formatter',
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
    heading: 'How to use JSON Formatter/Beautifier',
    listData: [
      `Paste unformatted/minified json in unformatted JSON block and JSON will be formatted automatically.`,
      `JSON formatting is being done in host browser only.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their JSON with just pasting it here.`,
      `Real-time formatting: Our tool formats your JSON in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your JSON into our platform and get a clean, organized, and optimized result.`,
    ],
  },
  {
    heading: 'Why Choose Our Online JSON Formatter Tool?',
    listData: [
      `Improves readability: Clean and organized JSON is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized JSON makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
];
