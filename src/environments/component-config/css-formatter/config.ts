import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/css-formatter';
const pageTitle = 'CSS Beautifier and Formatter: Beautify and Format CSS Code';
const pageDescription =
  'Beautify and format your CSS code with ease with our free online CSS beautifier and formatter tool. No download required, no sign-up required.';
const imageUrl = `${environment.screenshotsBaseUrl}/css-format.png`;

const keywords =
  'online CSS beautifier and formatter,beautify CSS code,format CSS code,CSS beautifier and formatter tool,CSS code formatter,CSS code style,improve CSS code readability,make CSS code more consistent,follow CSS code style guidelines,free CSS beautifier and formatter,no download required,supports all CSS features,easy to use,customizable settings,CSS code style guide,CSS code formatting errors';

const relatedTools: ApplicationIds[] = [
  ApplicationIds.JSON_FORMATTER,
  ApplicationIds.JSON_VIEWER,
  ApplicationIds.JS_FORMATTER,
  ApplicationIds.HTML_FORMATTER,
];

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online CSS Beautifier and Formatter: Beautify and Format Your CSS Code with Ease',
  navigationUrl,
  pageTitle,
  metaTags: [
    {
      name: 'description',
      content: pageDescription,
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
    {
      property: 'og:title',
      content: pageTitle,
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${environment.hostname}${navigationUrl}` },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:secure_url', content: imageUrl },
    { property: 'og:description', content: pageDescription },
    { property: 'og:site_name', content: 'WebToolsEasy' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:site', content: '@webtoolseasy' },
    { property: 'twitter:title', content: pageTitle },
    { property: 'twitter:description', content: pageDescription },
    { property: 'twitter:image', content: imageUrl },
  ],
  tags: keywords.split(',').map(word => word.trim()),
  icons: [],
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'What is a CSS Beautifier and Formatter?',
    blockData: [
      'A CSS beautifier and formatter is a tool that takes your CSS code and formats it in a consistent and readable style. This can make your code easier to read, understand, and maintain.',
    ],
  },
  {
    heading: 'Why Use a CSS Beautifier and Formatter?',
    listData: [
      'To improve the readability of your code. Well-formatted code is easier to read and understand, which can help you to write better code and to debug your code more easily.',
      'To make your code more consistent. A CSS beautifier and formatter can help you to format your code in a consistent style, which can make your code more readable and maintainable.',
      'To follow code style guidelines. Many companies have code style guidelines that they require their developers to follow. A CSS beautifier and formatter can help you to format your code in accordance with these guidelines.',
    ],
  },
  {
    heading: 'Features of Our Online CSS Beautifier and Formatter Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Beautify and format your CSS code directly from your web browser.',
      'Supports all CSS features. Our beautifier and formatter supports all the features of the CSS language, including CSS3 and CSS4.',
      'Easy to use. Simply paste your CSS code into the editor and click the "Beautify and Format" button.',
      'Customizable settings. You can customize the settings of our beautifier and formatter to match your personal preferences.',
    ],
  },
  {
    heading: 'How to Use Our Online CSS Beautifier and Formatter Tool',
    listData: [
      'Go to our website and paste your CSS code into the editor.',
      'Click the "Beautify and Format" button.',
      'View your beautified and formatted CSS code in the sidebar.',
      'Copy and paste your beautified and formatted CSS code into your project.',
    ],
  },
  {
    heading: 'Tips for Using a CSS Beautifier and Formatter',
    listData: [
      'Use a consistent code style. Choose a code style and use it consistently throughout your project. This will make your code more readable and maintainable.',
      'Format your code before you commit it to a repository. This will help to ensure that your code is readable and maintainable for other developers.',
      'Use a CSS beautifier and formatter to check for formatting errors. A CSS beautifier and formatter can help you to identify and fix formatting errors in your code.',
    ],
  },
  {
    blockData: [
      'Our free online CSS beautifier and formatter tool is a great way to beautify and format your CSS code with ease. It is easy to use and supports all the features of the CSS language. With our beautifier and formatter, you can improve the readability, consistency, and maintainability of your CSS code.',
    ],
  },
];
