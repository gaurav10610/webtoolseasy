import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online UUID Generator',
  navigationUrl: '/tools/uuid',
  pageTitle: 'Online UUID Generator',
  metaTags: [
    {
      name: 'description',
      content:
        'UUID Generator | Generate UUID | Online UUID Generator | Generate UUID V4 | Generate UUID V1 | UUID V4 | UUID V1',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'uuid',
    'uuid v4 generator',
    'uuid v1 generator',
    'online uuid generator',
    'generate uuid',
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
