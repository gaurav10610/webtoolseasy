import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools/markdown-editor';
const pageTitle = 'Markdown Editor | Md Editors | ReadME Builder';
const pageDescription =
  'Online markdown editor lets you edit markdown/readme in brwoser. Preview markdown code in browser. Graphically create readme for code repos such as github/bitbucket.';
const imageUrl = `${environment.screenshotsBaseUrl}/markdown-editor.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Markdown Editor',
  subHeading: 'Edit Markdown/ReadMe in Browser',
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
    'markdown editor',
    'markdown parser',
    'readme builder',
    'readme editor',
    'github readme',
  ],
  icons: [],
};

export const descriptionData: DescriptionBlock[] = [];
