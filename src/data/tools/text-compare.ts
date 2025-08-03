import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/text-compare";
const pageTitle = "Text Compare Tool - Compare Text Differences Online";
const pageDescription = `Compare two texts side by side and highlight differences instantly. Free online text comparison tool perfect for documents, code, and content analysis.`;
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/text-diff.png`;
const keywords =
  "text compare,compare text online,text diff tool,text comparison,compare documents,text difference,document compare,text checker";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
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
    "Free Online Text Compare Tool: Find Differences Between Two Texts Easily",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.WORD_COUNTER],
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
      "Here are some of the benefits of using our free online text compare tool:",
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
      "Here are some examples of how you can use our free online text compare tool:",
    listData: [
      "Students can use the tool to check the originality of their essays and assignments.",
      "Writers can use the tool to check for plagiarism in their articles and blog posts.",
      "Bloggers can use the tool to compare their blog posts to other blog posts to see if they are similar.",
      "Anyone can use the tool to compare any two texts to see if they are similar.",
    ],
  },
  {
    heading: "How to use our free online text compare tool:",
    listData: [
      "Copy and paste your texts into the text boxes.",
      "The tool will instantly show you the differences.",
      "You can also view a side-by-side comparison of the two texts to see how they differ.",
    ],
  },
  {
    heading: "Tips for using our free online text compare tool:",
    listData: [
      "Make sure to copy and paste all of your text into the text boxes, including any spaces, line breaks, and punctuation.",
      "If you need to compare a large amount of text, you can break it down into smaller sections and compare them one at a time.",
      'You can also use the tool to compare two text files. Simply upload the files to the tool and click the "Compare" button.',
    ],
  },
  {
    heading: "Benefits of using our free online text compare tool:",
    listData: [
      "Our tool is quick and easy to use.",
      "Our tool is completely free.",
      "Our tool is accurate and reliable.",
      "Our tool is versatile and can be used for a variety of tasks, such as checking the originality of work, checking for plagiarism, and comparing two texts for similarity.",
    ],
  },
  {
    blockData: [
      "No matter what your needs are, our free online text compare tool is a valuable resource. Try it today and see how easy it is to use!",
    ],
  },
];
