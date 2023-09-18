import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/word-counter';
const pageTitle =
  'Free Word, Character, and Sentence Count Tool - Count Words, Characters, and Sentences in Seconds';
const pageDescription =
  'Our free online word, character, and sentence count tool is quick, easy, and accurate. Simply copy and paste your text into the text box and see the number of words, characters, and sentences in your text.';
const imageUrl = `${environment.screenshotsBaseUrl}/word-counter.png`;

const keywords =
  'word count tool, character count tool, sentence count tool, free word count tool, free character count tool, free sentence count tool, online word count tool, online character count tool, online sentence count tool, word counter, character counter, sentence counter, word count, character count, sentence count';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Word And Character Count',
  subHeading: 'Count Word, Character And Sentence Online For Free',
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
  ],
  relatedTools: [
    {
      applicationId: 'textcompare',
      displayText: AppDisplayNames.TEXT_COMPARE,
      iconName: 'comparison-icon',
      navigateUrl: '/tools/text-compare',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      `Looking for a quick and easy way to count the words, characters, and sentences in your writing? Try our free online word, character, and sentence count tool! It's simple to use and completely free.`,
      `To use the tool, simply copy and paste your text into the text box and click the "Count" button. The tool will instantly calculate the number of words, characters, and sentences in your text. It will also show you the character count with and without spaces, so you can choose the count that's right for you.`,
      `Our word, character, and sentence count tool is perfect for students, writers, bloggers, social media marketers, and anyone else who needs to keep track of the length of their writing. It's also great for checking word and character limits for specific platforms, such as Twitter, Facebook, and LinkedIn.`,
    ],
  },
  {
    heading:
      'Here are some of the benefits of using our free online word, character, and sentence count tool:',
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It's accurate and reliable.`,
      `It counts words, characters, and sentences.`,
      `It shows you the character count with and without spaces.`,
      `It's perfect for students, writers, bloggers, social media marketers, and anyone else who needs to keep track of the length of their writing.`,
      `It's great for checking word and character limits for specific platforms.`,
    ],
  },
  {
    heading:
      'Here are some examples of how you can use our free online word, character, and sentence count tool:',
    listData: [
      'Students can use the tool to check the word count of their essays and assignments to make sure they meet the length requirements.',
      `Writers can use the tool to track the length of their articles and blog posts to make sure they're not too long or too short.`,
      `Bloggers can use the tool to check the word count of their blog posts to make sure they're optimized for search engines.`,
      `Social media marketers can use the tool to check the character count of their tweets, Facebook posts, and other social media posts to make sure they stay within the character limits.`,
    ],
  },
  {
    heading:
      'How to use our free online word, character, and sentence count tool:',
    listData: [
      `Copy and paste your text into the text box.`,
      `The tool will instantly calculate the number of words, characters, and sentences in your text.`,
      `The tool will also show you the character count with and without spaces.`,
    ],
  },
  {
    heading:
      'Tips for using our free online word, character, and sentence count tool:',
    listData: [
      'Make sure to copy and paste all of your text into the text box, including any spaces, line breaks, and punctuation.',
      'If you need to check the word count of a specific section of text, simply select that section of text and copy and paste it into the text box.',
      'You can also use the tool to check the word count of multiple documents. Simply separate each document with a line break.',
    ],
  },
  {
    heading:
      'Benefits of using our free online word, character, and sentence count tool:',
    listData: [
      'Our tool is quick and easy to use.',
      'Our tool is completely free.',
      'Our tool is accurate and reliable.',
      'Our tool is versatile and can be used for a variety of tasks, such as checking the word count of essays, articles, blog posts, social media posts, and more.',
    ],
  },
  {
    blockData: [
      `No matter what your needs are, our free online word, character, and sentence count tool is a valuable resource. Try it today and see how easy it is to use!`,
    ],
  },
];
