import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/json-formatter';
const pageTitle =
  'JSON Beautifier and Formatter: Beautify and Format Your JSON';
const pageDescription =
  'Beautify and format your JSON data with ease with our free online JSON beautifier and formatter tool. No download required, no sign-up required.';
const imageUrl = `${environment.screenshotsBaseUrl}/json-format.png`;

const keywords =
  'online JSON beautifier and formatter,beautify JSON data,format JSON data,JSON beautifier and formatter tool,JSON data formatter,JSON data style,improve JSON data readability,make JSON data more consistent,follow JSON data style guidelines,free JSON beautifier and formatter,JSON data formatting errors';

const relatedTools: ApplicationIds[] = [
  ApplicationIds.JSON_VIEWER,
  ApplicationIds.HTML_FORMATTER,
  ApplicationIds.JS_FORMATTER,
  ApplicationIds.CSS_FORMATTER,
];

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online JSON Beautifier and Formatter: Beautify and Format Your JSON Data with Ease',
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
    heading: 'What is a JSON Beautifier and Formatter?',
    blockData: [
      'A JSON beautifier and formatter is a tool that takes your JSON data and formats it in a consistent and readable style. This can make your data easier to read, understand, and maintain.',
    ],
  },
  {
    heading: 'Why Use a JSON Beautifier and Formatter?',
    listData: [
      'To improve the readability of your data. Well-formatted data is easier to read and understand, which can help you to write better code and to debug your code more easily.',
      'To make your data more consistent. A JSON beautifier and formatter can help you to format your data in a consistent style, which can make your data more readable and maintainable.',
      'To follow data style guidelines. Many companies have data style guidelines that they require their developers to follow. A JSON beautifier and formatter can help you to format your data in accordance with these guidelines.',
    ],
  },
  {
    heading: 'Features of Our Online JSON Beautifier and Formatter Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Beautify and format your JSON data directly from your web browser.',
      'Supports all JSON features. Our beautifier and formatter supports all the features of the JSON language, including JSON5 and JSON Schema.',
      'Easy to use. Simply paste your JSON data into the editor and click the "Beautify and Format" button.',
      'Customizable settings. You can customize the settings of our beautifier and formatter to match your personal preferences.',
    ],
  },
  {
    heading: 'How to Use Our Online JSON Beautifier and Formatter Tool',
    listData: [
      'Go to our website and paste your JSON data into the editor.',
      'Click the "Beautify and Format" button.',
      'View your beautified and formatted JSON data in the sidebar.',
      'Copy and paste your beautified and formatted JSON data into your project.',
    ],
  },
  {
    heading: 'Tips for Using a JSON Beautifier and Formatter',
    listData: [
      'Use a consistent data style. Choose a data style and use it consistently throughout your project. This will make your data more readable and maintainable.',
      'Format your data before you commit it to a repository. This will help to ensure that your data is readable and maintainable for other developers.',
      'Use a JSON beautifier and formatter to check for formatting errors. A JSON beautifier and formatter can help you to identify and fix formatting errors in your data.',
    ],
  },
  {
    blockData: [
      'Our free online JSON beautifier and formatter tool is a great way to beautify and format your JSON data with ease. It is easy to use and supports all the features of the JSON language. With our beautifier and formatter, you can improve the readability, consistency, and maintainability of your JSON data.',
    ],
  },
];
