import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/css-formatter';
const pageTitle = 'Best CSS Formatter / Beautifier';
const pageDescription =
  'CSS Formatter | CSS Beautifier | CSS Prettify | CSS Formatter Online | CSS Beautifier Online';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'CSS Formatter',
  subHeading: 'Online CSS Beautifier',
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
      applicationId: 'jsformatter',
      displayText: AppDisplayNames.JS_FORMATTER,
      iconName: 'js-icon',
      navigateUrl: '/tools/js-formatter',
    },
    {
      applicationId: 'jsonformatter',
      displayText: AppDisplayNames.JSON_FORMATTER,
      iconName: 'json-icon',
      navigateUrl: '/tools/json-formatter',
    },
    {
      applicationId: 'jsonviewer',
      displayText: AppDisplayNames.JSON_VIEWER,
      iconName: 'json-icon',
      navigateUrl: '/tools/json-viewer',
    },
    {
      applicationId: 'htmlformatter',
      displayText: AppDisplayNames.HTML_FORMATTER,
      iconName: 'html-icon',
      navigateUrl: '/tools/html-formatter',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use CSS Formatter / Beautifier?',
    listData: [
      `Paste unformatted / minified CSS in unformatted CSS block and CSS will be formatted / beautified automatically.`,
    ],
  },
  {
    heading: 'Why choose our Online CSS Formatter Tool?',
    listData: [
      `Improves readability: Clean and organized CSS is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized CSS makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
  {
    heading: 'What is CSS or Cascading Style Sheets?',
    blockData: [
      `Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their CSS with just pasting it here.`,
      `Real-time formatting: Our tool formats your CSS in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your CSS into our platform and get a clean, organized, and optimized result.`,
      `Formatted / Beautified CSS can be saved or copied easily.`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText:
          'Read more about CSS or Cascading Style Sheet at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/CSS',
      },
      {
        displayText: 'RFC 2318 - The text/css Media Type',
        url: 'https://datatracker.ietf.org/doc/html/rfc2318',
      },
      {
        displayText: 'CSS Introduction at w3schools.com',
        url: 'https://www.w3schools.com/css/css_intro.asp',
      },
    ],
  },
];
