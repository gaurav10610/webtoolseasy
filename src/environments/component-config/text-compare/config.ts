import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/text-compare';
const pageTitle =
  'Online Text Compare Tool - Compare Two Texts for Differences';
const pageDescription = `Our text compare tool is a quick and easy way to compare two texts for similarity and differences. It's perfect for students, writers, bloggers.`;
const imageUrl = `${environment.screenshotsBaseUrl}/text-diff.png`;
const keywords =
  'text compare tool, text comparison tool, text diff tool, compare text online, compare text files, compare text documents, plagiarism checker, compare documents for similarity, compare two texts, text similarity checker, compare text online free, text compare online, compare text ignore whitespace';

const relatedTools: ApplicationIds[] = [ApplicationIds.WORD_COUNTER];

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Text Compare - Text to Text Comparison',
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
  icons: [],
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      `Looking for a quick and easy way to compare two texts for similarity and differences? Try our free online text compare tool! It's simple to use and completely free.`,
      'To use the tool, simply copy and paste your texts into the text boxes and click the "Compare" button. The tool will instantly calculate the similarity percentage between the two texts and show you the differences. You can also view a side-by-side comparison of the two texts to see how they differ.',
      `Our text compare tool is perfect for students, writers, bloggers, and anyone else who needs to check the originality of their work. It's also great for checking for plagiarism and ensuring that your work is unique.`,
    ],
  },
  {
    heading:
      'Here are some of the benefits of using our free online text compare tool:',
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It's accurate and reliable.`,
      `It calculates the similarity percentage between two texts.`,
      `It shows you the differences between two texts.`,
      `It provides a side-by-side comparison of two texts.`,
      `It's perfect for students, writers, bloggers, and anyone else who needs to check the originality of their work.`,
      `It's great for checking for plagiarism and ensuring that your work is unique.`,
    ],
  },
  {
    heading:
      'Here are some examples of how you can use our free online text compare tool:',
    listData: [
      'Students can use the tool to check the originality of their essays and assignments.',
      'Writers can use the tool to check for plagiarism in their articles and blog posts.',
      'Bloggers can use the tool to compare their blog posts to other blog posts to see if they are similar.',
      'Anyone can use the tool to compare any two texts to see if they are similar.',
    ],
  },
  {
    heading: 'How to use our free online text compare tool:',
    listData: [
      'Copy and paste your texts into the text boxes.',
      'The tool will instantly show you the differences.',
      'You can also view a side-by-side comparison of the two texts to see how they differ.',
    ],
  },
  {
    heading: 'Tips for using our free online text compare tool:',
    listData: [
      'Make sure to copy and paste all of your text into the text boxes, including any spaces, line breaks, and punctuation.',
      'If you need to compare a large amount of text, you can break it down into smaller sections and compare them one at a time.',
      'You can also use the tool to compare two text files. Simply upload the files to the tool and click the "Compare" button.',
    ],
  },
  {
    heading: 'Benefits of using our free online text compare tool:',
    listData: [
      'Our tool is quick and easy to use.',
      'Our tool is completely free.',
      'Our tool is accurate and reliable.',
      'Our tool is versatile and can be used for a variety of tasks, such as checking the originality of work, checking for plagiarism, and comparing two texts for similarity.',
    ],
  },
  {
    blockData: [
      'No matter what your needs are, our free online text compare tool is a valuable resource. Try it today and see how easy it is to use!',
    ],
  },
];
