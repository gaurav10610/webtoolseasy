import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/text-editor";
const pageTitle = "Online Text Editor: Write, Edit Plain Text on Notepad";
const pageDescription =
  "Unleash your inner novelist, blogger, or student with our distraction-free online text editor. Write with laser focus, format with ease, and access your work from anywhere.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/text-editor.png`;

const keywords =
  "online text editor, online notepad, writing tool, distraction-free writing, cloud-based storage, real-time collaboration, export options, focus mode, writing tips, creative writing, student writing, professional writing";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
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
  mainHeading: "Online Text Editor: Write, Edit Plain Text on Notepad",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.WORD_COUNTER,
    ApplicationIds.CASE_CONVERETR,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading:
      "Write, Edit, and Collaborate Effortlessly with Our Free Online Text Editor",
    blockData: [
      `Unlock a seamless writing experience with our feature-rich online text editor. Whether you're crafting a blog post, drafting an email, or collaborating on a project, our intuitive platform has everything you need to create compelling content.`,
    ],
  },
  {
    heading: "Key Features of Online Text Editor",
    listData: [
      `Write anywhere, anytime: Access your work from any device with an internet connection.`,
      `Collaboration: Share your work via shareable link.`,
      `Multiple formatting options: Format text, add images and links, and create visually appealing content.`,
      `Mobile Compatibility: Edit on the go with seamless smartphone and tablet support.`,
      `Export to multiple formats: Download your work in Rich Custom WebToolsEasy format, or plain text formats.`,
      `100% Free: No hidden fees or subscriptions.`,
    ],
  },
  {
    heading: "Benefits of Using Our Online Text Editor",
    listData: [
      `Increased productivity: Streamline your writing workflow and get more done in less time.`,
      `Enhanced collaboration: Work effectively with team members and stakeholders.`,
      `Improved content quality: Produce error-free, polished content that impresses.`,
      `Security: Your content is 100% secure as all the processing is being done in browser only meaning your content never leaves the browser.`,
      `Flexibility and convenience: Access your work from anywhere, at any time.`,
    ],
  },
  {
    heading: "Common Use Cases of Online Text Editor",
    listData: [
      `Writing blog posts and articles`,
      `Creating website content`,
      `Drafting emails and letters`,
      `Collaborating on documents with team members`,
      `Taking notes and brainstorming ideas`,
      `Writing code`,
    ],
  },
  {
    blockData: [`Start writing today—it's free!`],
  },
];
