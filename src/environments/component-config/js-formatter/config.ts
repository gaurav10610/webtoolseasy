import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/js-formatter';
const pageTitle = 'Best Online Javascript Formatter | Javascript Beautifier';
const pageDescription =
  'Our Best Online Javascript Formatter/Beautifier tool lets you beautify/format your JavaScript code for free';
const imageUrl = `${environment.screenshotsBaseUrl}/js-format.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Javascript Formatter',
  subHeading: 'Online Javascript Beautifier',
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
  tags: [
    'js formatter',
    'js beautifier',
    'string format javascript',
    'javascript prettify',
    'javascript formatter',
    'javascript beautifier',
  ],
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
  ],
  relatedTools: [
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
    heading: 'How to use Javascript Formatter / Beautifier?',
    listData: [
      `Paste unformatted / minified Javascript in unformatted Javascript block and code it be formatted / beautified automatically.`,
    ],
  },
  {
    heading: 'Why choose our Online JavaScript Formatter / Beautifier Tool?',
    listData: [
      `Improves readability: Clean and organized code is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized code makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
  {
    heading: `What is Javascript?`,
    blockData: [
      `JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
      `JavaScript's dynamic capabilities include runtime object construction, variable parameter lists, function variables, dynamic script creation (via eval), object introspection (via for...in and Object utilities), and source-code recovery (JavaScript functions store their source text and can be retrieved through toString()).`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Supports online editing of your Javascript code using our inbuilt monaco code edior.`,
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their JavaScript code with just pasting Javascript here.`,
      `Real-time formatting: Our tool formats your Javascript in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your code into our platform and get a clean, organized, and optimized result.`,
      `Formatted / Beautified Javascript can be saved or copied easily.`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about Javascript at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/JavaScript',
      },
      {
        displayText: 'Learn Javascript at w3schools.com',
        url: 'https://www.w3schools.com/js/DEFAULT.asp',
      },
      {
        displayText: 'Read about Javascript at Mozilla Developer Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
    ],
  },
];
