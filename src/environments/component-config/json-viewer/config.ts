import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/json-viewer';
const pageTitle = 'Free Online JSON Viewer: View Your JSON in a Tree Structure';
const pageDescription =
  'View your JSON data in a tree structure with our free online JSON viewer tool. No download required, no sign-up required.';
const imageUrl = `${environment.screenshotsBaseUrl}/json-viewer.png`;

const keywords =
  'online JSON viewer,view JSON data,JSON tree structure,JSON data tree,JSON data viewer,JSON viewer tool,free JSON viewer,no download required,supports all JSON features,easy to use,customizable settings,JSON beautifier,JSON formatter,expand and collapse,search JSON data';

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online JSON Viewer: View Your JSON Data in a Tree Structure',
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
  icons: [
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
    {
      iconName: 'js-icon',
      iconRelativeUrl: 'js-icon.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'jsonformatter',
      displayText: AppDisplayNames.JSON_FORMATTER,
      iconName: 'json-icon',
      navigateUrl: '/tools/json-formatter',
    },
    {
      applicationId: 'htmlformatter',
      displayText: AppDisplayNames.HTML_FORMATTER,
      iconName: 'html-icon',
      navigateUrl: '/tools/html-formatter',
    },
    {
      applicationId: 'jsformatter',
      displayText: AppDisplayNames.JS_FORMATTER,
      iconName: 'js-icon',
      navigateUrl: '/tools/js-formatter',
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
    heading: 'What is a JSON Viewer?',
    blockData: [
      'A JSON viewer is a tool that allows you to view JSON data in a human-readable format. JSON viewers typically display JSON data in a tree structure, which makes it easier to read and understand.',
    ],
  },
  {
    heading: 'Why Use a JSON Viewer?',
    listData: [
      'To make JSON data more readable. JSON data is often stored in a single line of text, which can make it difficult to read and understand. A JSON viewer can display JSON data in a tree structure, which makes it much easier to read and understand.',
      'To debug JSON data. If you are having trouble with your JSON data, a JSON viewer can help you to identify the problem. JSON viewers typically display error messages and warnings, which can help you to fix the problem.',
      'To learn more about JSON. JSON is a powerful data format, but it can be difficult to learn. A JSON viewer can help you to learn more about JSON by displaying the data in a visual format.',
    ],
  },
  {
    heading: 'Features of Our Online JSON Viewer Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. View your JSON data directly from your web browser.',
      'Supports all JSON features. Our JSON viewer supports all the features of the JSON language, including JSON5 and JSON Schema.',
      'Easy to use. Simply paste your JSON data into the editor and click the "View JSON" button.',
      'Customizable settings. You can customize the settings of our JSON viewer to match your personal preferences.',
    ],
  },
  {
    heading: 'How to Use Our Online JSON Viewer Tool',
    listData: [
      'Go to our website and paste your JSON data into the editor.',
      'Click the "View JSON" button.',
      'View your JSON data in a tree structure in the sidebar.',
      'Expand and collapse the nodes of the tree structure to view the data in more detail.',
    ],
  },
  {
    heading: 'Tips for Using a JSON Viewer',
    listData: [
      'Use a JSON beautifier and formatter to format your JSON data before you view it in a JSON viewer. This will make it easier to read and understand your JSON data.',
      'Use the expand and collapse features of the tree structure to view your JSON data in more detail.',
      'Use the search feature of the JSON viewer to search for specific values in your JSON data.',
    ],
  },
  {
    blockData: [
      'Our free online JSON viewer tool is a great way to view your JSON data in a tree structure. It is easy to use and supports all the features of the JSON language. With our JSON viewer, you can easily read and understand your JSON data, debug problems, and learn more about the JSON language.',
    ],
  },
];
