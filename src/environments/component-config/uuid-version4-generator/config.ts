import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/uuid-v4-generator';
const pageTitle =
  'Online UUID Version4 (v4) Generator | Bulk UUID v4 Generator';
const pageDescription =
  'Our free online UUID v4 generator tool is a quick and easy way to generate universally unique identifiers (UUIDs), either individually or in bulk. Simply enter the number of UUIDs you need and click the "Generate" button to generate a list of unique UUID v4s.';
const imageUrl = `${environment.screenshotsBaseUrl}/uuid-v4-generator.png`;

const keywords =
  'UUID v4 generator, UUID generator online, UUID generator free, UUID v4, UUID, universally unique identifier, GUID, globally unique identifier, generate UUID, generate UUID online, generate UUID free';

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'UUID v4 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Online for Free',
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
      applicationId: 'uuidv1',
      displayText: AppDisplayNames.UUID_VERSION1_GENERATOR,
      iconName: 'uuid-icon',
      navigateUrl: '/tools/uuid-v1-generator',
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
      'Universally unique identifiers (UUIDs) are also known as globally unique identifiers (GUIDs). They are 128-bit numbers that are used to identify information in computer systems. UUIDs are generated using a random number generator and are designed to be unique.',
      'UUIDs are used in a variety of applications, such as database identifiers, session identifiers, and file identifiers. They are also used in distributed systems to ensure that all systems are using the same unique identifier for a given piece of information.',
      'Our free online UUID v4 generator tool makes it easy to generate UUIDs, whether you need one or many. To use the tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v4s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading:
      'Here are some of the benefits of using our free online UUID v4 generator tool:',
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It can generate single or bulk UUID v4s.`,
      `It generates random and unique UUID v4s.`,
      `It's perfect for developers, testers, and anyone else who needs to generate UUIDs.`,
      `It's great for learning more about UUIDs and how they work.`,
    ],
  },
  {
    heading:
      'Here are some examples of how you can use our free online UUID v4 generator tool:',
    listData: [
      'Developers can use the tool to generate UUIDs for database identifiers, session identifiers, and file identifiers.',
      'Testers can use the tool to generate UUIDs for test data.',
      'Anyone can use the tool to generate UUIDs for any reason.',
    ],
  },
  {
    blockData: [
      'No matter what your needs are, our free online UUID v4 generator tool is a valuable resource. Try it today and see how easy it is to use!',
    ],
  },
  {
    heading: 'What is a UUID v4?',
    blockData: [
      'A UUID v4 is a version 4 UUID, which is generated using a random number generator. UUID v4s are the most commonly used type of UUID and are considered to be the most secure.',
    ],
  },
  {
    heading: 'How to use our UUID v4 generator tool:',
    blockData: [
      'To use our UUID v4 generator tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v4s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading: 'Tips for using our UUID v4 generator tool:',
    listData: [
      'You can generate as many UUID v4s as you need.',
      'You can also use our UUID v4 generator tool to generate UUID v4s in different formats, such as hexadecimal, base64, and URL safe.',
    ],
  },
  {
    blockData: [
      'We hope you find our free online UUID v4 generator tool helpful!',
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
