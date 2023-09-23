import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/guid-generator';
const pageTitle = 'GUID Generator: Online Tool to Generate GUIDs | Bulk GUIDs';
const pageDescription =
  'Our free online GUID generator tool is a quick and easy way to generate globally unique identifiers (GUIDs), either individually or in bulk. Simply enter the number of GUIDs you need and click the "Generate" button to generate a list of unique GUIDs.';
const imageUrl = `${environment.screenshotsBaseUrl}/guid-generator.png`;

const keywords =
  'GUID generator, GUID generator online, GUID generator free, GUID, globally unique identifier, UUID, universally unique identifier, generate GUID, generate GUID online, generate GUID free, single GUID, bulk GUID, bulk GUID generator';

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'GUID Generator Tool - Generate Single or Bulk Globally Unique Identifiers (GUIDs) Online for Free',
  subHeading: 'Generate Random GUID Online',
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
      applicationId: 'uuidv4',
      displayText: AppDisplayNames.UUID_VERSION4_GENERATOR,
      iconName: 'uuid-icon',
      navigateUrl: '/tools/uuid-v4-generator',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      'Globally unique identifiers (GUIDs) are also known as universally unique identifiers (UUIDs). They are 128-bit numbers that are used to identify information in computer systems. GUIDs are generated using a variety of methods, but all GUIDs are designed to be unique.',
      'GUIDs are used in a variety of applications, such as database identifiers, session identifiers, and file identifiers. They are also used in some security applications, such as encryption and authentication.',
      'Our free online GUID generator tool makes it easy to generate GUIDs, whether you need one or many. To use the tool, simply enter the number of GUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of GUIDs and show it to you. You can then copy and paste the list of GUIDs into your application.',
    ],
  },
  {
    heading:
      'Here are some of the benefits of using our free online GUID generator tool:',
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It can generate single or bulk GUIDs.`,
      `It generates random and unique GUIDs.`,
      `It's perfect for developers, testers, and anyone else who needs to generate GUIDs.`,
      `It's great for learning more about GUIDs and how they work.`,
    ],
  },
  {
    heading:
      'Here are some examples of how you can use our free online GUID generator tool:',
    listData: [
      'Developers can use the tool to generate GUIDs for database identifiers, session identifiers, and file identifiers.',
      'Testers can use the tool to generate GUIDs for test data.',
      'Anyone can use the tool to generate GUIDs for any reason.',
    ],
  },
  {
    blockData: [
      'No matter what your needs are, our free online GUID generator tool is a valuable resource. Try it today and see how easy it is to use!',
    ],
  },
  {
    heading: 'What is a GUID?',
    blockData: [
      'A GUID is a globally unique identifier, also known as a universally unique identifier (UUID). It is a 128-bit number that is used to identify information in computer systems. GUIDs are generated using a variety of methods, but all GUIDs are designed to be unique.',
    ],
  },
  {
    heading: 'How to use our GUID generator tool:',
    blockData: [
      'To use our GUID generator tool, simply enter the number of GUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of GUIDs and show it to you. You can then copy and paste the list of GUIDs into your application.',
    ],
  },
  {
    heading: 'Tips for using our GUID generator tool:',
    listData: [
      'You can generate as many GUIDs as you need.',
      'You can also use our GUID generator tool to generate GUIDs in different formats, such as hexadecimal, base64, and URL safe.',
    ],
  },
  {
    blockData: [
      'We hope you find our free online GUID generator tool helpful!',
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
