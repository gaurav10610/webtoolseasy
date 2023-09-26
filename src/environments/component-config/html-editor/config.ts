import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/html-editor';
const pageTitle =
  'Free Online HTML Editor: Write, Edit, and Run HTML Code Directly from Your Browser';
const pageDescription =
  'Write, edit, and run HTML code directly from your browser with our free online HTML editor. No download required, no sign-up required. Create and publish web pages with ease.';
const imageUrl = `${environment.screenshotsBaseUrl}/html-editor.png`;

const keywords =
  'online HTML editor,write HTML code,edit HTML code,run HTML code,free HTML editor,no download required,supports all HTML elements and attributes,syntax highlighting,code completion,error checking,real-time preview,code sharing,tips for using an online HTML editor,test your code before publishing';

const relatedTools: ApplicationIds[] = [];

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online HTML Editor: Write, Edit, and Run HTML Code Directly from Your Browser',
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
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
  icons: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'What is an Online HTML Editor?',
    blockData: [
      'An online HTML editor is a web-based tool that allows you to write, edit, and run HTML code directly from your browser. This makes it easy to create and publish web pages without having to download or install any software.',
    ],
  },
  {
    heading: 'Why Use an Online HTML Editor?',
    listData: [
      `Convenience. Online HTML editors are convenient and easy to use. You can access them from any device with a web browser, and you don't need to install any software.`,
      'Collaboration. Online HTML editors make it easy to collaborate with others on web development projects. You can share your code with others and work on the same project together in real time.',
      'Features. Online HTML editors offer a variety of features to help you write and edit HTML code, including syntax highlighting, code completion, and error checking.',
    ],
  },
  {
    heading: 'Features of Our Online HTML Editor',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Write, edit, and run HTML code directly from your browser.',
      'Supports all HTML elements and attributes. Our editor supports all HTML elements and attributes, so you can create any type of web page you want.',
      'Syntax highlighting and code completion. Our editor provides syntax highlighting and code completion to help you write and edit HTML code more efficiently.',
      'Error checking. Our editor checks your code for errors and warnings to help you avoid problems.',
      'Real-time preview. Our editor provides a real-time preview of your web page so you can see how your changes look as you make them.',
    ],
  },
  {
    heading: 'How to Use Our Online HTML Editor',
    listData: [
      'Go to our website and click the "New File" button.',
      'Enter a name for your file and click the "Create" button.',
      'Start writing your HTML code.',
      'To preview your web page, click the "Preview" button.',
      'To save your changes, click the "Save" button.',
      'To share your code with others, click the "Share" button and copy the link.',
    ],
  },
  {
    heading: 'Tips for Using an Online HTML Editor',
    listData: [
      'Use a high-quality online HTML editor. Not all online HTML editors are created equal. Some editors may not support all HTML elements and attributes, or they may not provide accurate error checking. Make sure to choose a high-quality online HTML editor to ensure that you have a positive experience.',
      'Use the features of your editor. Most online HTML editors offer a variety of features to help you write and edit HTML code more efficiently. Be sure to explore the features of your editor and learn how to use them to your advantage.',
      'Test your code before publishing it. Once you have finished writing your HTML code, be sure to test it before publishing it. You can do this by previewing your web page in your browser or by uploading it to a web server.',
    ],
  },
  {
    blockData: [
      'Our free online HTML editor is a great way to write, edit, and run HTML code directly from your browser. It is easy to use and offers a variety of features to help you create and publish web pages with ease.',
    ],
  },
];
