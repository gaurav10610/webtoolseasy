import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

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

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use CSS Formatter/Beautifier',
    listData: [
      `Paste unformatted/minified CSS in unformatted CSS block and CSS will be formatted automatically.`,
      `CSS formatting is being done in host browser only.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their CSS with just pasting it here.`,
      `Real-time formatting: Our tool formats your CSS in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your CSS into our platform and get a clean, organized, and optimized result.`,
    ],
  },
  {
    heading: 'Why Choose Our Online CSS Formatter Tool?',
    listData: [
      `Improves readability: Clean and organized CSS is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized CSS makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
];
