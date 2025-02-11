import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/javascript-compiler";
const pageTitle = "Online JavaScript Compiler: Compile JS Code in Browser";
const pageDescription =
  "Compile and execute JavaScript code directly in your browser with our lightning-fast, feature-rich online compiler. Perfect for beginners, students, and professionals alike.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/javascript-compiler.png`;

const keywords =
  "online javascript compiler, javascript compiler, javascript online, run javascript online, code javascript online, free javascript compiler, compile js online, online js compiler, run javascript in browser, run js in browser";

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
    "Online JavaScript Compiler: Compile & Run JavaScript in Browser",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.HTML_EDITOR, ApplicationIds.MARKDOWN_EDITOR],
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      "Need a quick and reliable way to test your JavaScript code snippets or experiment with new concepts? Look no further than our free online JavaScript compiler! Effortlessly write, run, and debug your code directly within your browser, without any setup or installations required.",
    ],
  },
  {
    heading: "Key Features of Online JavaScript Compiler",
    listData: [
      `Instant Compilation: Experience lightning-fast code execution thanks to our cutting-edge compiler technology.`,
      `Browser-Based: Access the compiler anytime, anywhere, from any device with an internet connection.`,
      `Debugging Tools: Pinpoint errors efficiently with helpful error messages and debugging features.`,
      `Code Sharing: Easily share your code creations with others via unique URLs.`,
      `Beginner-Friendly: Ideal for learning JavaScript with a user-friendly interface and clear syntax highlighting.`,
      `Perfect for Professionals: Streamline your development workflow by quickly testing code snippets and ideas.`,
      `Security: Your javascript code is 100% secured as it won't leave the browser and javascript code will be compiled, run in browser only.`,
    ],
  },
  {
    heading: "Unlock the Power of JavaScript Today:",
    listData: [
      `Write Your Code: Type your JavaScript code directly into the editor, making use of the intuitive code completion and syntax highlighting features.`,
      `Click "Run": Witness your code come to life as it's compiled and executed in a matter of seconds.`,
      `Review Results: Analyze the output in the console and use debugging tools to troubleshoot any errors.`,
      `Share and Collaborate: Share your code with ease using the generated URL, enabling seamless collaboration and knowledge sharing.`,
    ],
  },
  {
    blockData: [
      "Start coding today! Visit our online JavaScript compiler now and unleash your programming potential.",
    ],
  },
];
