import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools/text-compare';
const pageTitle =
  'Compare text online to find the difference between two text files';
const pageDescription =
  'Text File Difference tool will compare text to find the difference between two text files. Just paste your files and Find Difference!';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Text File Difference',
  subHeading: 'Compare Text Files Online',
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
    'diff checker',
    'text to compare',
    'text compare online',
    'file diff',
    'text difference checker',
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
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to compare text',
    listData: [
      `Paste original text in text 1 area or upload a file 1 to compare.`,
      `Paste target text in text 2 area or upload a file 2 to compare.`,
      `Difference between both the texts will be evaluated automatically and will be reflected in difference area.`,
      `Default text comparion type is charcter by charcter, which can be changed via comparison type dropdown to any of the available comparison type like word by word or line by line.`,
      `To ignore case while comparing, use the corresponding checkbox.`,
      `To ignore leading & trailing whitespace while comparing, use the corresponding checkbox.`,
      `For swapping text 1 & text 2 with each other use the switch texts button.`,
      `After making any of the above change difference between both the texts will be evaluated automatically.`,
    ],
  },
  {
    heading: 'What is the need of a text file comparison / difference tool?',
    listData: [
      `An online text file comparison / difference tool is an essential tool for writers, students, researchers, and anyone who needs to compare texts quickly and easily. With this tool, you can compare different versions of a text, identify similarities and differences between texts, and highlight changes between texts.`,
      `This tool uses advanced algorithms to accurately compare texts, making it easy for you to identify differences, changes, and similarities. Whether you're working on an academic project, a research paper, or a business report, an online text comparison tool can help you get the job done faster and more accurately.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Text file comparsion / difference tool is 100% free.`,
      `Text file comparison / difference is 100% secure as whole processing is being done at client side only (in host browser).`,
      `Unlimited text file comparison.`,
      `Track down plagiarism.`,
      `Compare text files character by character, word by word or line by line`,
      `Optionally, you can ignore whitepsace.`,
    ],
  },
];
