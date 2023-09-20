import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/markdown-editor';
const pageTitle =
  'Free Online Markdown Editor: Write and Preview Markdown in Real Time';
const pageDescription =
  'Write and preview Markdown in real time with our free online Markdown editor. No download required, no sign-up required.';
const imageUrl = `${environment.screenshotsBaseUrl}/markdown-editor.png`;

const keywords =
  'online Markdown editor,write Markdown,preview Markdown,real-time preview,export Markdown to HTML,export Markdown to PDF,export Markdown to Microsoft Word,free Markdown editor,no download required,supports Markdown syntax,Markdown syntax highlighting,share Markdown documents';

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online Markdown Editor: Write and Preview Markdown in Real Time',
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
  tags: keywords.split(',').map(word => word.trim()),
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
    heading: 'What is Markdown?',
    blockData: [
      'Markdown is a lightweight markup language that allows you to create formatted text using a plain text editor. Markdown is commonly used to create README files, blog posts, and documentation.',
    ],
  },
  {
    heading: 'Why Use an Online Markdown Editor?',
    listData: [
      'To write and preview Markdown in real time. Most online Markdown editors allow you to see the preview of your Markdown as you write it. This makes it easy to see how your formatted text will look before you publish it.',
      'To collaborate with others on Markdown documents. Some online Markdown editors allow you to collaborate with others on Markdown documents in real time. This can be useful for creating team documentation or blog posts.',
      'To export your Markdown documents to different formats. Most online Markdown editors allow you to export your Markdown documents to different formats, such as HTML, PDF, and Microsoft Word. This makes it easy to share your Markdown documents with others who do not use Markdown.',
    ],
  },
  {
    heading: 'Features of Our Online Markdown Editor',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Write and preview Markdown directly from your web browser.',
      'Supports Markdown syntax. Our editor supports all the standard Markdown syntax, as well as some additional features such as GFM and CommonMark.',
      'Real-time preview. See the preview of your Markdown as you write it.',
      'Export to different formats. Export your Markdown documents to HTML, PDF, and Microsoft Word.',
    ],
  },
  {
    heading: 'How to Use Our Online Markdown Editor',
    listData: [
      'Go to our website and click the "Start Writing" button.',
      'Type your Markdown in the editor.',
      'See the preview of your Markdown in the sidebar.',
      'When you are finished writing, click the "Export" button to export your document to a different format.',
    ],
  },
  {
    heading: 'Tips for Using an Online Markdown Editor',
    listData: [
      'Use the preview to see how your formatted text will look. The preview is a great way to see how your Markdown will look before you publish it.',
      'Use the syntax highlighting to make your Markdown more readable. The syntax highlighting will highlight the different elements of your Markdown, such as headings, links, and code blocks.',
      'Use the export feature to share your Markdown documents with others. The export feature makes it easy to share your Markdown documents with others who do not use Markdown.',
    ],
  },
  {
    blockData: [
      'Our free online Markdown editor is a great way to write and preview Markdown in real time. It is easy to use and supports all the standard Markdown syntax. With our editor, you can create README files, blog posts, documentation, and more.',
    ],
  },
];
