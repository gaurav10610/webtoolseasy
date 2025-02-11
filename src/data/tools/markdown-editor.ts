import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/markdown-editor";
const pageTitle = "Free Online Markdown Editor: Preview Markdown in Real Time";
const pageDescription =
  "Write, edit and preview Markdown in real time with our free online Markdown editor. Create, edit and preview ReadME and Md Online.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/markdown-editor.png`;

const keywords =
  "online Markdown editor,write Markdown,preview Markdown,real-time preview,export Markdown to HTML,export Markdown to PDF,export Markdown to Microsoft Word,free Markdown editor,no download required,supports Markdown syntax,Markdown syntax highlighting,share Markdown documents,md editors,md markup editor,md editor online";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: "/favicon.png",
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
    "Free Online Markdown Editor: Write, Edit and Preview Markdown in Real Time",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.TEXT_COMPARE, ApplicationIds.JWT_DECODER],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Markdown?",
    blockData: [
      "Markdown is a lightweight markup language that allows you to create formatted text using a plain text editor. Markdown is commonly used to create README files, blog posts, and documentation.",
    ],
  },
  {
    heading: "Why Use an Online Markdown Editor?",
    listData: [
      "To write and preview Markdown in real time. Most online Markdown editors allow you to see the preview of your Markdown as you write it. This makes it easy to see how your formatted text will look before you publish it.",
      "To collaborate with others on Markdown documents. Some online Markdown editors allow you to collaborate with others on Markdown documents in real time. This can be useful for creating team documentation or blog posts.",
      "To export your Markdown documents to different formats. Most online Markdown editors allow you to export your Markdown documents to different formats, such as HTML, PDF, and Microsoft Word. This makes it easy to share your Markdown documents with others who do not use Markdown.",
    ],
  },
  {
    heading: "Features of Our Online Markdown Editor",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Write and preview Markdown directly from your web browser.",
      "Supports Markdown syntax. Our editor supports all the standard Markdown syntax, as well as some additional features such as GFM and CommonMark.",
      "Real-time preview. See the preview of your Markdown as you write it.",
      "Export to different formats. Export your Markdown documents to HTML, PDF, and Microsoft Word.",
    ],
  },
  {
    heading: "How to Use Our Online Markdown Editor",
    listData: [
      'Go to our website and click the "Start Writing" button.',
      "Type your Markdown in the editor.",
      "See the preview of your Markdown in the sidebar.",
      'When you are finished writing, click the "Export" button to export your document to a different format.',
    ],
  },
  {
    heading: "Tips for Using an Online Markdown Editor",
    listData: [
      "Use the preview to see how your formatted text will look. The preview is a great way to see how your Markdown will look before you publish it.",
      "Use the syntax highlighting to make your Markdown more readable. The syntax highlighting will highlight the different elements of your Markdown, such as headings, links, and code blocks.",
      "Use the export feature to share your Markdown documents with others. The export feature makes it easy to share your Markdown documents with others who do not use Markdown.",
    ],
  },
  {
    blockData: [
      "Our free online Markdown editor is a great way to write and preview Markdown in real time. It is easy to use and supports all the standard Markdown syntax. With our editor, you can create README files, blog posts, documentation, and more.",
    ],
  },
];
