import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

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
    {
      iconName: 'json-icon',
      iconRelativeUrl: 'json-icon.svg',
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
    heading: 'How to use JS Formatter/Beautifier',
    listData: [
      `Paste unformatted/minified javascript in unformatted js block and code will be formatted automatically.`,
      `Javascript formatting is being done locally in browser only.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their JavaScript code with just pasting code here.`,
      `Real-time formatting: Our tool formats your code in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your code into our platform and get a clean, organized, and optimized result.`,
    ],
  },
  {
    heading: 'Why Choose Our Online JavaScript Formatter Tool?',
    listData: [
      `Improves readability: Clean and organized code is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized code makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
];
