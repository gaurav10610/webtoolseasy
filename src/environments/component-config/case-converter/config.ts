import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/case-converter';
const pageTitle = 'Online Case Converter: Convert Text to Uppercase, Lowercase';
const pageDescription =
  'Convert text to any case with ease using our free online case converter tool. No download required, no sign-up required. Convert text to uppercase, lowercase, sentence case, title case, and more.';
const imageUrl = `${environment.screenshotsBaseUrl}/case-converter.png`;

const keywords =
  'case converter,convert text to any case,free case converter,no download required,supports all case types,easy to use,customizable settings,uppercase,lowercase,sentence case,title case,case types,case rules,format text,correct errors in case,learn about case';

const relatedTools: ApplicationIds[] = [];

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Free Online Case Converter: Convert Text to Any Case with Ease',
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
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
  icons: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'What is a Case Converter?',
    blockData: [
      'A case converter is a tool that can be used to convert text to any case. This includes uppercase, lowercase, sentence case, title case, and more. Case converters are often used to format text for different purposes, such as writing emails, creating documents, and publishing content online.',
    ],
  },
  {
    heading: 'Why Use a Case Converter?',
    listData: [
      'To format text for different purposes. Case converters can be used to format text for different purposes, such as writing emails, creating documents, and publishing content online. For example, you may want to use title case for the title of a blog post or sentence case for the body of an email.',
      'To correct errors in case. Case converters can also be used to correct errors in case. For example, if you accidentally type a sentence in all caps, you can use a case converter to convert it to sentence case.',
      'To learn more about case. Case converters can also be used to learn more about case. For example, you can use a case converter to see how different types of case are used in different contexts.',
    ],
  },
  {
    heading: 'Features of Our Online Case Converter Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Convert text to any case directly from your web browser.',
      'Supports all case types. Our converter supports all case types, including uppercase, lowercase, sentence case, title case, and more.',
      'Easy to use. Simply paste your text into the converter and select the desired case type. Then, click the "Convert" button.',
      'Customizable settings. You can customize the settings of our converter to match your personal preferences. For example, you can choose to capitalize the first letter of each word or to capitalize all pronouns.',
    ],
  },
  {
    heading: 'How to Use Our Online Case Converter Tool',
    listData: [
      'Go to our website and paste your text into the converter.',
      'Select the desired case type from the dropdown menu.',
      'Click the "Convert" button.',
      'View your converted text in the sidebar.',
      'Copy and paste your converted text into your project.',
    ],
  },
  {
    heading: 'Tips for Using a Case Converter',
    listData: [
      'Choose a high-quality case converter. Not all case converters are created equal. Some converters may not produce accurate results or may not support all case types. Make sure to choose a high-quality case converter to ensure that your converted text is accurate and reliable.',
      'Test your converted text. Once you have converted your text, be sure to test it to make sure that it is accurate. You can do this by reading it over carefully or by using a spell checker.',
      'Understand the different types of case. There are many different types of case, each with its own rules. It is important to understand the different types of case before using a case converter. This will help you to choose the correct case type for your needs.',
    ],
  },
  {
    blockData: [
      'Our free online case converter tool is a great way to convert text to any case with ease. It is easy to use and supports all case types. With our converter, you can easily format text for different purposes, correct errors in case, and learn more about case.',
    ],
  },
];
