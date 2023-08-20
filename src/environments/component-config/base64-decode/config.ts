import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Base64 to File Decode',
  subHeading: 'Decode Base64 to File',
  navigationUrl: '/tools/base64-decode',
  pageTitle: 'Base64 to File | Base64 Decode | Base64 Converter | Base64',
  metaTags: [
    {
      name: 'description',
      content:
        'Free online tool to decode base64 to file. Base64 decoder. Convert any base64 data uri to file',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  relatedTools: [
    {
      applicationId: 'base64encoder',
      displayText: AppDisplayNames.BASE64_ENCODE,
      iconName: 'file-encode-icon',
      navigateUrl: '/tools/base64-encode',
    },
  ],
  tags: [
    'base64 decode',
    'base64 decode online',
    'base64 to file decoder',
    'online base64 decode',
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
    {
      iconName: 'file-encode-icon',
      iconRelativeUrl: 'file-encode.svg',
    },
    {
      iconName: 'share-fb',
      iconRelativeUrl: 'share-fb.svg',
    },
    {
      iconName: 'share-linkedin',
      iconRelativeUrl: 'share-linkedin.svg',
    },
    {
      iconName: 'share-twitter',
      iconRelativeUrl: 'share-twitter.svg',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'How to Decode Base64 to File?',
    listData: [
      `Paste Base64 Data URI in the text box in order to decode it to a file`,
      `After pasting the Base64 Data URI, use decode base64 button to decode the data into a file`,
      `After Base64 data is decoded the download link for the file will appear automatically`,
    ],
  },
  {
    heading: 'Example Input Format',
    blockData: [
      `Base64 Data URI => data:text/csv;base64,IklEIiwiQ3VzdG9tZXIgSUQiLCJMU`,
    ],
  },
  {
    heading: 'Why choose our Online Base64 to File Decoder?',
    listData: [
      `Intuitive UX: Easy to use interface to decode Base64 to File`,
      `Saves time: Fast and secure Base64 to File conversion`,
      `Cross-platform: Cross-platform Base64 to File decoding tool`,
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
      `Fast and secure Base64 to File conversion`,
      `Free tool to convert Base64 to File`,
      `Base64 decoding for all file types`,
      `Base64 to File conversion with high data integrity`,
      `Cross-platform Base64 to File decoding tool`,
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
        displayText: 'RFC 4648 - Base64 Encoding',
        url: 'https://datatracker.ietf.org/doc/html/rfc4648#section-4',
      },
      {
        displayText: 'Base64 Docs - Mozilla',
        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Base64',
      },
    ],
  },
];
