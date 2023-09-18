import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/markdown-editor';
const pageTitle = 'Markdown Editor | Md Editors | Markdown Syntax';
const pageDescription =
  'Edit Markdown in browser. Markdown Editor offers a split-screen view with a real-time preview of your formatted document alongside the Markdown source code.';
const imageUrl = `${environment.screenshotsBaseUrl}/markdown-editor.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Markdown Editor',
  subHeading: 'Edit Markdown/ReadME in Browser',
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
    'markdown editor',
    'markdown parser',
    'markdown codeblock',
    'readme builder',
    'readme editor',
    'github readme',
  ],
  icons: [
    {
      iconName: 'comparison-icon',
      iconRelativeUrl: 'comparison.svg',
    },
    {
      iconName: 'jwt-icon',
      iconRelativeUrl: 'jwt-icon.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'textcompare',
      displayText: AppDisplayNames.TEXT_COMPARE,
      iconName: 'comparison-icon',
      navigateUrl: '/tools/text-compare',
    },
    {
      applicationId: 'jwt',
      displayText: AppDisplayNames.JWT_DECODER,
      iconName: 'jwt-icon',
      navigateUrl: '/tools/jwt',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to use Online Markdown Editor?',
    listData: [
      'Write markdown code in the text area.',
      'Use preview button to preview the markdown.',
      'Use editor icons to format the markdown text as per the requirements.',
      'For live preview of the markdown text, use the side by side mode via the toggle button.',
      'Use the copy button to copy the markdown editor text to the clipboard.',
      'Use download button to download the markdown text as README.md file.',
    ],
  },
  {
    heading: 'What is Markdown?',
    blockData: [
      'Markdown is a lightweight markup language that is widely used for formatting text. It was created by John Gruber and Aaron Swartz in 2004, with the goal of providing a simple and easy-to-read way to format text that could be converted into HTML. Markdown is often used for writing documents that will be published online, such as web pages, README files on code repositories, and documentation.',
      'Markdown uses a simple and intuitive syntax that includes plain text formatting elements like headers, lists, links, and emphasis (bold and italic text).',
      `Markdown is widely supported across various platforms, and there are numerous tools and editors available for writing in Markdown. It's a popular choice for technical documentation, blogging, and collaborative writing because of its simplicity and compatibility. When you write in Markdown, you can easily convert your Markdown-formatted text into HTML or other formats using Markdown processors or converters.`,
    ],
  },
  {
    heading: 'Key Features',
    listData: [
      'Real-time Preview: Online Markdown Editor offers a split-screen view with a real-time preview of your formatted document alongside the Markdown source code. This allows you to see how your document will look as you write it.',
      'Syntax Highlighting: Online Markdown Editor provide syntax highlighting, which color-codes different elements of Markdown syntax, making it easier to distinguish headers, links, code blocks, and more.',
      'Live Editing: Live editing feature enables you to edit the Markdown code directly in the preview, and the changes are reflected instantly. This can be useful for fine-tuning the formatting.',
      'Spell Check and Grammar Check: Online Markdown Editor come with built-in spell checkers and sometimes even grammar checkers to help you catch errors in your writing.',
      'Table Creation: Markdown editors often have tools for creating tables, which can be challenging to format manually.',
      'Cross Browser Compatibility: Online Markdown Editor is cross platform compatible.',
      'Security: All your data is 100% secure as all the processing will be happening in host browser only.',
    ],
  },
];
