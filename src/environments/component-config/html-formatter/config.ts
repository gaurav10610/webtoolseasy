import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/html-formatter';
const pageTitle = 'Best HTML Formatter / Beautifier';
const pageDescription =
  'HTML Formatter | HTML Beautifier | HTML Formatter Online | HTML Code Formatter';
const imageUrl = `${environment.screenshotsBaseUrl}/html-format.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'HTML Formatter',
  subHeading: 'Online HTML Beautifier',
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
  ],
  tags: [
    'html formatter',
    'html beautify',
    'fhtml formatter online',
    'html code formatter',
  ],
  icons: [
    {
      iconName: 'app-icon',
      iconRelativeUrl: 'app-icon.svg',
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
      iconName: 'share-copy',
      iconRelativeUrl: 'share-copy.svg',
    },
    {
      iconName: 'home-icon',
      iconRelativeUrl: 'home.svg',
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
      applicationId: 'cssformatter',
      displayText: AppDisplayNames.CSS_FORMATTER,
      iconName: 'css-icon',
      navigateUrl: '/tools/css-formatter',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use HTML Formatter / Beautifier?',
    listData: [
      `Paste unformatted / minified HTML in unformatted HTML block and HTML will be formatted / beautified automatically.`,
    ],
  },
  {
    heading: 'Why choose our Online HTML Formatter / Beautifier Tool?',
    listData: [
      `Improves readability: Clean and organized HTML is easier to read and understand, making it easier for you or your team to work with.`,
      `Saves time: Automated formatting and optimization saves you time and effort compared to manual formatting.`,
      `Supports collaboration: Clean, organized HTML makes it easier for multiple people to work on the same project, improving collaboration and reducing the risk of errors.`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
  {
    heading: 'What is HTML or Hypertext Markup Language?',
    blockData: [
      `The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It is often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.`,
      `Web browsers receive HTML documents from a web server or from local storage and render the documents into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for its appearance.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Easy to use: Our user-friendly interface makes it simple for anyone to format their HTML with just pasting it here.`,
      `Real-time formatting: Our tool formats your HTML in real-time, so you can see the changes as you make them.`,
      `No need to download any software. Simply paste your HTML into our platform and get a clean, organized, and optimized result.`,
      `Formatted / Beautified HTML can be saved or copied easily.`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText:
          'Read more about HTML or Hypertext Markup Language at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/HTML',
      },
      {
        displayText: 'RFC 2318 - Hypertext Markup Language - 2.0',
        url: 'https://www.rfc-editor.org/rfc/rfc1866',
      },
      {
        displayText: 'HTML Introduction at w3schools.com',
        url: 'https://www.w3schools.com/html/html_intro.asp',
      },
    ],
  },
];
