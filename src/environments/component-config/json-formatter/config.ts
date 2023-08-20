import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/json-formatter';
const pageTitle = 'Best JSON Formatter / Beautifier and JSON Validator';
const pageDescription =
  'Online JSON Formatter / Beautifier and JSON Validator will format JSON data, and helps to validate. Save and Copy JSON';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'JSON Formatter',
  subHeading: 'Online JSON Beautifier',
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
    { property: 'og:image', content: environment.appIconUrl },
    { property: 'og:description', content: pageDescription },
    { property: 'og:site_name', content: 'WebToolsEasy' },
  ],
  tags: [
    'json formatter',
    'json validator',
    'json beautifier',
    'best json formatter',
    'best json validator',
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
    {
      iconName: 'css-icon',
      iconRelativeUrl: 'css.svg',
    },
    {
      iconName: 'share-fb',
      iconRelativeUrl: 'share-fb.svg',
    },
    {
      iconName: 'share-linkedin',
      iconRelativeUrl: 'share-linkedin.svg',
    },
    {
      iconName: 'share-twitter',
      iconRelativeUrl: 'share-twitter.svg',
    },
    {
      iconName: 'share-whatsapp',
      iconRelativeUrl: 'share-whatsapp.svg',
    },
    {
      iconName: 'share-copy',
      iconRelativeUrl: 'share-copy.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'jsonviewer',
      displayText: AppDisplayNames.JSON_VIEWER,
      iconName: 'json-icon',
      navigateUrl: '/tools/json-viewer',
    },
    {
      applicationId: 'jsformatter',
      displayText: AppDisplayNames.JS_FORMATTER,
      iconName: 'js-icon',
      navigateUrl: '/tools/js-formatter',
    },
    {
      applicationId: 'htmlformatter',
      displayText: AppDisplayNames.HTML_FORMATTER,
      iconName: 'html-icon',
      navigateUrl: '/tools/html-formatter',
    },
    {
      applicationId: 'cssformatter',
      displayText: AppDisplayNames.CSS_FORMATTER,
      iconName: 'css-icon',
      navigateUrl: '/tools/css-formatter',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use JSON Formatter / Beautifier / Validator?',
    listData: [
      `Paste unformatted / minified json in unformatted JSON block and JSON will be formatted / beautified / validated automatically.`,
    ],
  },
  {
    heading: 'Why choose our Online JSON Formatter Tool?',
    listData: [
      `Improves readability: Clean and organized JSON is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized JSON makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
  {
    heading: 'What is JSON or JavaScript Object Notation?',
    blockData: [
      `JSON or JavaScript Object Notation is a language-independent open data format that uses human-readable text to express data objects consisting of attribute-value pairs.`,
      `Although originally derived from the JavaScript scripting language, JSON data can be generated and parsed with a wide variety of programming languages including JavaScript, PHP, Python, Ruby, and Java.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their JSON with just pasting it here.`,
      `Real-time formatting: Our tool formats your JSON in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your JSON into our platform and get a clean, organized, and optimized result.`,
      `Auto validation: Once a JSON is pasted then tool will auto validate the JSON before formatting it.`,
      `Formatted JSON can be saved or copied easily.`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText:
          'Read more about JSON or JavaScript Object Notation at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/JSON',
      },
      {
        displayText:
          'RFC 8259 - The JavaScript Object Notation (JSON) Data Interchange Format',
        url: 'https://datatracker.ietf.org/doc/html/rfc8259',
      },
      {
        displayText: 'json.org',
        url: 'https://www.json.org/json-en.html',
      },
    ],
  },
];
