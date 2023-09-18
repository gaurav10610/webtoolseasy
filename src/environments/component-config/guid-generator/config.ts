import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/guid-generator';
const pageTitle = 'GUID Generator | Bulk GUID Generator | Generate GUID Online';
const pageDescription =
  'GUID generator tool lets you generate random/unique GUID. Supports bulk GUID generation.';
const imageUrl = `${environment.screenshotsBaseUrl}/guid-generator.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online GUID Generator',
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
  tags: [
    'guid',
    'online guid generator',
    'generate guid online',
    'generate guid',
    'bulk uuid generator',
  ],
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
    heading: 'What is Version GUID?',
    blockData: [
      `GUID stands for "Globally Unique Identifier." It is a 128-bit hexadecimal number that is used to uniquely identify various resources or entities in computer systems. GUIDs are generated using algorithms designed to ensure their uniqueness across space and time, which means that the probability of two GUIDs being the same is extremely low, even when generated on different machines in different locations.`,
    ],
  },
  {
    heading: 'Key Features',
    listData: [
      `Unlimited GUID generation for free`,
      `Generate GUIDs in bulk using bulk GUID generator tool and export GUIDs in a text file`,
      `Security: All the GUIDs are generated in host browser only`,
    ],
  },
  {
    heading: 'Disclaimer',
    blockData: [
      `Generated GUIDs are provided as is without any kind of warranty.`,
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
