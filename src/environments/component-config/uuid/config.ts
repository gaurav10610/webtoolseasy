import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online UUID Generator',
  subHeading: 'Generate UUID V4 & V1 For Free',
  navigationUrl: '/tools/uuid',
  pageTitle: 'Online UUID Generator',
  metaTags: [
    {
      name: 'description',
      content:
        'UUID Generator | Generate UUID | Online UUID Generator | Generate UUID V4 | Generate UUID V1 | Bulk UUID Generator',
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
    'bulk uuid generator',
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
