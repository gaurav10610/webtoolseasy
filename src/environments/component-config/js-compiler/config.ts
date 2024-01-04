import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/javascript-compiler';
const pageTitle = 'Online JavaScript Compiler: Compile JS Code in Browser';
const pageDescription =
  'Compile and execute JavaScript code directly in your browser with our lightning-fast, feature-rich online compiler. Perfect for beginners, students, and professionals alike.';
const imageUrl = `${environment.screenshotsBaseUrl}/javascript-compiler.png`;

const keywords =
  'online javascript compiler, javascript compiler, javascript online, run javascript online, code javascript online, free javascript compiler, compile js online, online js compiler, run javascript in browser, run js in browser';

const relatedTools: ApplicationIds[] = [];

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Online JavaScript Compiler: Compile & Run JavaScript in Browser',
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
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
  icons: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      'Need a quick and reliable way to test your JavaScript code snippets or experiment with new concepts? Look no further than our free online JavaScript compiler! Effortlessly write, run, and debug your code directly within your browser, without any setup or installations required.',
    ],
  },
  {
    heading: 'Key Features of Online JavaScript Compiler',
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
    heading: 'Unlock the Power of JavaScript Today:',
    listData: [
      `Write Your Code: Type your JavaScript code directly into the editor, making use of the intuitive code completion and syntax highlighting features.`,
      `Click "Run": Witness your code come to life as it's compiled and executed in a matter of seconds.`,
      `Review Results: Analyze the output in the console and use debugging tools to troubleshoot any errors.`,
      `Share and Collaborate: Share your code with ease using the generated URL, enabling seamless collaboration and knowledge sharing.`,
    ],
  },
  {
    blockData: [
      'Start coding today! Visit our online JavaScript compiler now and unleash your programming potential.',
    ],
  },
];
