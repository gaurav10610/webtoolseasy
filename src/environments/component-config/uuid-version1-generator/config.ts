import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/uuid-v1-generator';
const pageTitle =
  'Online UUID Version1 (v1) Generator | Bulk UUID v1 Generator';
const pageDescription =
  'Our free online UUID v1 generator tool is a quick and easy way to generate universally unique identifiers (UUIDs) based on MAC address and time, either individually or in bulk. Simply enter the number of UUIDs you need and click the "Generate" button to generate a list of unique UUID v1s.';
const imageUrl = `${environment.screenshotsBaseUrl}/uuid-v1-generator.png`;

const keywords =
  'UUID v1 generator, UUID generator online, UUID generator free, UUID v1, UUID, universally unique identifier, GUID, globally unique identifier, generate UUID, generate UUID online, generate UUID free, MAC address, time, timestamp';

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'UUID v1 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Based on MAC Address and Time',
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
  icons: [
    {
      iconName: 'jwt-icon',
      iconRelativeUrl: 'jwt-icon.svg',
    },
    {
      iconName: 'uuid-icon',
      iconRelativeUrl: 'uuid-icon.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'jwt',
      displayText: AppDisplayNames.JWT_DECODER,
      iconName: 'jwt-icon',
      navigateUrl: '/tools/jwt',
    },
    {
      applicationId: 'uuidv4',
      displayText: AppDisplayNames.UUID_VERSION4_GENERATOR,
      iconName: 'uuid-icon',
      navigateUrl: '/tools/uuid-v4-generator',
    },
    {
      applicationId: 'guid',
      displayText: AppDisplayNames.GUID_GENERATOR,
      iconName: 'uuid-icon',
      navigateUrl: '/tools/guid-generator',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      'Universally unique identifiers (UUIDs) are also known as globally unique identifiers (GUIDs). They are 128-bit numbers that are used to identify information in computer systems. UUIDs are generated using a variety of methods, but UUID v1s are generated using the MAC address of the computer on which they are generated and the current time.',
      'UUID v1s are often used in applications where it is important to track the origin of data, such as in database systems and distributed systems. They are also used in some security applications, such as encryption and authentication.',
      'Our free online UUID v1 generator tool makes it easy to generate UUID v1s, whether you need one or many. To use the tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v1s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading:
      'Here are some of the benefits of using our free online UUID v1 generator tool:',
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It can generate single or bulk UUID v1s.`,
      `It generates random and unique UUID v1s based on MAC address and time.`,
      `It's perfect for developers, testers, and anyone else who needs to generate UUID v1s.`,
      `It's great for learning more about UUID v1s and how they work.`,
    ],
  },
  {
    heading:
      'Here are some examples of how you can use our free online UUID v1 generator tool:',
    listData: [
      'Developers can use the tool to generate UUID v1s for database identifiers, session identifiers, and file identifiers.',
      'Testers can use the tool to generate UUID v1s for test data.',
      'Anyone can use the tool to generate UUID v1s for any reason.',
    ],
  },
  {
    blockData: [
      'No matter what your needs are, our free online UUID v1 generator tool is a valuable resource. Try it today and see how easy it is to use!',
    ],
  },
  {
    heading: 'What is a UUID v1?',
    blockData: [
      'A UUID v1 is a version 1 UUID, which is generated using the MAC address of the computer on which it is generated and the current time. UUID v1s are often used in applications where it is important to track the origin of data.',
    ],
  },
  {
    heading: 'How to use our UUID v1 generator tool:',
    blockData: [
      'To use our UUID v1 generator tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v1s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading: 'Tips for using our UUID v1 generator tool:',
    listData: [
      'You can generate as many UUID v1s as you need.',
      'You can also use our UUID v1 generator tool to generate UUID v1s in different formats, such as hexadecimal, base64, and URL safe.',
    ],
  },
  {
    blockData: [
      'We hope you find our free online UUID v1 generator tool helpful!',
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about UUIDs at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Universally_unique_identifier',
      },
      {
        displayText: 'RFC 4122',
        url: 'https://www.ietf.org/rfc/rfc4122.txt',
      },
    ],
  },
];
