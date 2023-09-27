import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/xml-to-json';
const pageTitle = 'Free Online XML to JSON Converter: Convert XML to JSON';
const pageDescription =
  'Convert XML to JSON with ease with our free online XML to JSON converter. No download required, no sign-up required.';
const imageUrl = `${environment.screenshotsBaseUrl}/xml-to-json.png`;

const keywords =
  'online XML to JSON converter,XML to JSON converter,XML to JSON,XML to JSON conversion,XML to JSON tool,free XML to JSON converter,no download required,supports all XML versions,easy to use,customizable settings,XML and JSON,XML to JSON best practices,JSON validator';

const relatedTools: ApplicationIds[] = [];

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online XML to JSON Converter: Convert XML to JSON in Seconds',
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
    heading: 'What is XML and JSON?',
    blockData: [
      'XML (Extensible Markup Language) and JSON (JavaScript Object Notation) are both data formats that are used to store and exchange data. XML is a markup language, which means that it uses tags to define the structure of the data. JSON is a lightweight data-interchange format that is easy to read and write.',
    ],
  },
  {
    heading: 'Why Use an XML to JSON Converter?',
    listData: [
      'To convert XML data to JSON data. JSON is a more lightweight and easier-to-read data format than XML. This makes it ideal for use in web applications and other applications where data needs to be exchanged quickly and efficiently.',
      'To troubleshoot XML data. XML to JSON converters can be used to troubleshoot XML data by converting it to a more readable JSON format. This can make it easier to identify errors in the XML data.',
      'To learn more about XML and JSON. XML to JSON converters can be used to learn more about XML and JSON by showing how the two data formats are related.',
    ],
  },
  {
    heading: 'Features of Our Online XML to JSON Converter Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Convert XML to JSON directly from your web browser.',
      'Supports all XML versions. Our converter supports all XML versions, including XML 1.0, XML 1.1, and XML 1.2.',
      'Easy to use. Simply paste your XML code into the converter and click the "Convert" button.',
      'Customizable settings. You can customize the settings of our converter to match your personal preferences.',
    ],
  },
  {
    heading: 'How to Use Our Online XML to JSON Converter Tool',
    listData: [
      'Go to our website and paste your XML code into the converter.',
      'Click the "Convert" button.',
      'View your converted JSON data in the sidebar.',
      'Copy and paste your converted JSON data into your project.',
    ],
  },
  {
    heading: 'Tips for Using an XML to JSON Converter',
    listData: [
      'Use a high-quality XML to JSON converter. Not all XML to JSON converters are created equal. Some converters may produce JSON data that is difficult to read or that is not valid. Make sure to use a high-quality XML to JSON converter to ensure that your converted JSON data is accurate and reliable.',
      'Test your converted JSON data. Once you have converted your XML data to JSON data, be sure to test it to make sure that it is valid. This can be done by using a JSON validator.',
      'Understand the differences between XML and JSON. XML and JSON are two different data formats with different strengths and weaknesses. It is important to understand the differences between XML and JSON before choosing which format to use for your project.',
    ],
  },
  {
    blockData: [
      'Our free online XML to JSON converter tool is a great way to convert XML data to JSON data with ease. It is easy to use and supports all XML versions. With our converter, you can easily convert your XML data to a more lightweight and easier-to-read JSON format.',
    ],
  },
];
