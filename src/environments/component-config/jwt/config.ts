import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/jwt';
const pageTitle = 'JWT Decoder: Online Tool to Decode JSON Web Tokens';
const pageDescription =
  'Our free online JWT decoder tool is a quick and easy way to decode JSON Web Tokens (JWTs). Decode JWT header and body. Validate JWT Token Online.';
const imageUrl = `${environment.screenshotsBaseUrl}/jwt-decoder.png`;
const keywords =
  'JWT decoder, JWT decoder online, JWT decoder free, JWT decoder tool, decode JWT, decode JWT online, decode JWT free, JWT debugger, JSON Web Token decoder, JSON Web Token decoder online, JSON Web Token decoder free, decode JWT header, validate JWT, validate JSON Web Token';

const relatedTools: ApplicationIds[] = [
  ApplicationIds.MARKDOWN_EDITOR,
  ApplicationIds.UUID_VERSION1_GENERATOR,
  ApplicationIds.UUID_VERSION4_GENERATOR,
  ApplicationIds.GUID_GENERATOR,
];

export const componentConfig: ApplicationConfig = {
  mainHeading: 'JWT Decoder - Decode and Validate JSON Web Token Online',
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
      'JSON Web Tokens (JWTs) are a popular way to encode and transmit data securely between two parties. JWTs are used in a variety of applications, such as authentication, authorization, and data sharing.',
      `If you need to decode a JWT, you can use our free online JWT decoder tool. It's simple to use and completely free.`,
      'To use the tool, simply copy and paste your JWT into the text box. The tool will instantly decode the JWT and show you the header, payload, and signature.',
      `Our JWT decoder tool is perfect for developers, testers, and anyone else who needs to decode JWTs. It's also great for learning more about JWTs and how they work.`,
      'No matter what your needs are, our free online JWT decoder tool is a valuable resource. Try it today and see how easy it is to use!',
    ],
  },
  {
    heading:
      'Here are some of the benefits of using our free online JWT decoder tool:',
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It's accurate and reliable.`,
      'It decodes JWTs into header, payload, and signature.',
      `It's perfect for developers, testers, and anyone else who needs to decode JWTs.`,
      `It's great for learning more about JWTs and how they work.`,
    ],
  },
  {
    heading:
      'Here are some examples of how you can use our free online JWT decoder tool:',
    listData: [
      'Developers can use the tool to decode JWTs that they are developing or testing.',
      'Testers can use the tool to decode JWTs that they are testing.',
      'Anyone can use the tool to decode JWTs that they have received or need to decode for any reason.',
    ],
  },
  {
    heading: 'What is a JWT?',
    blockData: [
      'A JSON Web Token (JWT) is an open standard (RFC 7519) for creating and verifying claims between two parties. A JWT is a string made up of three parts, separated by dots (.). The first part is the header, which contains information about the token, such as the algorithm used to sign it and the type of token. The second part is the payload, which contains the claims that are being made. The third part is the signature, which is used to verify the authenticity of the token.',
    ],
  },
  {
    heading: 'How to use our JWT decoder tool:',
    blockData: [
      'To use our JWT decoder tool, simply copy and paste your JWT into the text box and click the "Decode" button. The tool will instantly decode the JWT and show you the header, payload, and signature.',
    ],
  },
  {
    heading: 'Tips for using our JWT decoder tool:',
    listData: [
      `Make sure to copy and paste the entire JWT into the text box, including the dots (.).`,
      `If you are having trouble decoding a JWT, you can try using a different algorithm.`,
      `You can also use our JWT decoder tool to decode JWTs that are encoded in different ways, such as base64 encoded or URL safe encoded.`,
    ],
  },
  {
    blockData: ['We hope you find our free online JWT decoder tool helpful!'],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about JSON Web Token (JWT) at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/JSON_Web_Token',
      },
      {
        displayText: 'RFC 7519',
        url: 'https://www.ietf.org/rfc/rfc7519.txt',
      },
    ],
  },
];
