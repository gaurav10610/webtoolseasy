import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'File to Base64 Encode',
  subHeading: 'Encode File to Base64 Format',
  navigationUrl: '/tools/base64-encode',
  pageTitle: 'File to Base64 | Base64 Encode | Base64 Converter | Base64',
  metaTags: [
    {
      name: 'description',
      content:
        'Free online tool to encode file to Base64. Base64 encoder. Convert any file to base64',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'base64 encode',
    'base64 encode online',
    'file to base64 encoder',
    'online base64 converter',
  ],
  icons: [
    {
      iconName: 'app-icon',
      iconRelativeUrl: 'app-icon.svg',
    },
    {
      iconName: 'linkedin-icon',
      iconRelativeUrl: 'linkedin-icon.svg',
    },
    {
      iconName: 'facebook-icon',
      iconRelativeUrl: 'facebook.svg',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to Encode File to Base64?',
    listData: [
      `Drag and Drop or browse file in order to encode it to Base64`,
      `File will be encoded to Base64 automatically after selecting the file`,
      `Base64 data can be copied to clipboard using copy buttons`,
    ],
  },
  {
    heading: 'Output Formats',
    listData: [
      `Plain Base64 Text => IklEIiwiQ3VzdG9tZXIgSUQiLCJMU`,
      `Data URI => data:text/csv;base64,IklEIiwiQ3VzdG9tZXIgSUQiLCJMU`,
    ],
  },
  {
    heading: 'Why choose our Online File to Base64 Encoder?',
    listData: [
      `Intuitive UX: Easy to use interface to encode file to base64`,
      `Saves time: Fast and secure file to Base64 conversion`,
      `Cross-platform: Cross-platform file to Base64 encoding tool`,
      `Security: Your data is 100% secure on our platform as whole processing is being done in host browser only.`,
    ],
  },
  {
    heading: 'What is Base64?',
    blockData: [
      `Base64 is a binary-to-text encoding scheme that allows binary data to be represented as a sequence of printable ASCII characters. It is commonly used to encode binary data, such as images, audio, video, and other types of files, so that it can be transmitted over text-based protocols, like email or HTTP, which may not reliably support binary data.`,
      `The name "Base64" comes from the fact that it uses a set of 64 different printable characters, which consist of uppercase and lowercase letters (A-Z, a-z), numbers (0-9), and two additional special characters, usually '+' and '/'. The padding character '=' is used to ensure that the encoded output is a multiple of 4 characters, as the encoding is done in groups of 3 bytes.`,
      `The encoding process involves breaking the binary data into 6-bit chunks and converting them into their corresponding ASCII characters according to the Base64 encoding table. Each group of 3 bytes (24 bits) is then represented by 4 Base64 characters. Decoding Base64 is the reverse process, where the ASCII characters are converted back to their original binary representation.`,
      `Base64 encoding is widely used in various applications, such as: Email attachments, Data transmission, Data storage, Web development`,
      `It's important to note that Base64 is not a secure encryption method, as it is easily reversible. Its main purpose is to facilitate the transport and storage of binary data in environments that only support text-based formats.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Fast and secure file to Base64 conversion`,
      `Free tool to convert file to Base64`,
      `Base64 encoding for all file types`,
      `File to Base64 conversion with high data integrity`,
      `Cross-platform file to Base64 encoding tool`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about Base64 at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Base64',
      },
      {
        displayText: 'RFC 4648 - Base 64 Encoding',
        url: 'https://datatracker.ietf.org/doc/html/rfc4648#section-4',
      },
      {
        displayText: 'Base64 Docs - Mozilla',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64',
      },
    ],
  },
];
