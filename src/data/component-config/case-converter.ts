import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/case-converter";
const pageTitle = "Online Case Converter: Convert Text to Uppercase, Lowercase";
const pageDescription =
  "Convert text to any case with ease using our free online case converter tool. Convert text to uppercase, lowercase, sentence case, title case, and more.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/case-converter.png`;

const keywords =
  "case converter,convert text to any case,free case converter,easy to use,uppercase,lowercase,sentence case,title case,case types,format text,learn about case";

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
    "Online Case Converter: Convert Text to Lowercase, Uppercase, Sentence Case & Title Case",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Case Converter?",
    blockData: [
      "A case converter is a tool that can be used to convert text to any case. This includes uppercase, lowercase, sentence case, title case, and more. Case converters are often used to format text for different purposes, such as writing emails, creating documents, and publishing content online.",
    ],
  },
  {
    heading: "Why Use a Case Converter?",
    listData: [
      "To format text for different purposes. Case converters can be used to format text for different purposes, such as writing emails, creating documents, and publishing content online. For example, you may want to use title case for the title of a blog post or sentence case for the body of an email.",
      "To correct errors in case. Case converters can also be used to correct errors in case. For example, if you accidentally type a sentence in all caps, you can use a case converter to convert it to sentence case.",
      "To learn more about case. Case converters can also be used to learn more about case. For example, you can use a case converter to see how different types of case are used in different contexts.",
    ],
  },
  {
    heading: "Features of Our Online Case Converter Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Convert text to any case directly from your web browser.",
      "Supports all case types. Our converter supports all case types, including uppercase, lowercase, sentence case, title case, and more.",
      'Easy to use. Simply paste your text into the converter and select the desired case type. Then, click the "Convert" button.',
      "Customizable settings. You can customize the settings of our converter to match your personal preferences. For example, you can choose to capitalize the first letter of each word or to capitalize all pronouns.",
    ],
  },
  {
    heading: "How to Use Our Online Case Converter Tool",
    listData: [
      "Go to our website and paste your text into the converter.",
      "Select the desired case type from the dropdown menu.",
      'Click the "Convert" button.',
      "View your converted text in the sidebar.",
      "Copy and paste your converted text into your project.",
    ],
  },
  {
    heading: "Tips for Using a Case Converter",
    listData: [
      "Choose a high-quality case converter. Not all case converters are created equal. Some converters may not produce accurate results or may not support all case types. Make sure to choose a high-quality case converter to ensure that your converted text is accurate and reliable.",
      "Test your converted text. Once you have converted your text, be sure to test it to make sure that it is accurate. You can do this by reading it over carefully or by using a spell checker.",
      "Understand the different types of case. There are many different types of case, each with its own rules. It is important to understand the different types of case before using a case converter. This will help you to choose the correct case type for your needs.",
    ],
  },
  {
    blockData: [
      "Our free online case converter tool is a great way to convert text to any case with ease. It is easy to use and supports all case types. With our converter, you can easily format text for different purposes, correct errors in case, and learn more about case.",
    ],
  },
];
