import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/word-counter";
const pageTitle =
  "Free Word Count Tool: Count Words, Characters, and Sentences";
const pageDescription =
  "Our free online word, character, and sentence count tool is quick, and easy, and lets you count the number of words, characters, and sentences in your text.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/word-counter.png`;

const keywords =
  "word count tool, character count tool, sentence count tool, free word count tool, free character count tool, free sentence count tool, online word count tool, online character count tool, online sentence count tool, word counter, character counter, sentence counter, word count, character count, sentence count";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords,
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading:
    "Word, Character, and Sentence Counter: Count Words, Characters, and Sentences in Your Text",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.TEXT_COMPARE],
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
      "Here are some of the benefits of using our free online word, character, and sentence count tool:",
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
      "Here are some examples of how you can use our free online word, character, and sentence count tool:",
    listData: [
      "Students can use the tool to check the word count of their essays and assignments to make sure they meet the length requirements.",
      `Writers can use the tool to track the length of their articles and blog posts to make sure they're not too long or too short.`,
      `Bloggers can use the tool to check the word count of their blog posts to make sure they're optimized for search engines.`,
      `Social media marketers can use the tool to check the character count of their tweets, Facebook posts, and other social media posts to make sure they stay within the character limits.`,
    ],
  },
  {
    heading:
      "How to use our free online word, character, and sentence count tool:",
    listData: [
      `Copy and paste your text into the text box.`,
      `The tool will instantly calculate the number of words, characters, and sentences in your text.`,
      `The tool will also show you the character count with and without spaces.`,
    ],
  },
  {
    heading:
      "Tips for using our free online word, character, and sentence count tool:",
    listData: [
      "Make sure to copy and paste all of your text into the text box, including any spaces, line breaks, and punctuation.",
      "If you need to check the word count of a specific section of text, simply select that section of text and copy and paste it into the text box.",
      "You can also use the tool to check the word count of multiple documents. Simply separate each document with a line break.",
    ],
  },
  {
    heading:
      "Benefits of using our free online word, character, and sentence count tool:",
    listData: [
      "Our tool is quick and easy to use.",
      "Our tool is completely free.",
      "Our tool is accurate and reliable.",
      "Our tool is versatile and can be used for a variety of tasks, such as checking the word count of essays, articles, blog posts, social media posts, and more.",
    ],
  },
  {
    blockData: [
      `No matter what your needs are, our free online word, character, and sentence count tool is a valuable resource. Try it today and see how easy it is to use!`,
    ],
  },
];
