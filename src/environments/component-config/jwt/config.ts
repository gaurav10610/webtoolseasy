import { ApplicationConfig } from 'src/app/@types/config';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'JWT Decoder',
  subHeading: 'Decode JSON Web Token For Free',
  navigationUrl: '/tools/jwt',
  pageTitle: 'JWT Token Decode',
  metaTags: [
    {
      name: 'description',
      content:
        'JWT Decoder | JWT Decode | JWT Token Decode | JWT Decode HS256 | Online JWT Token Decoder | JSON Web Token',
    },
    {
      name: 'author',
      content: 'Gaurav Kumar Yadav',
    },
    { name: 'robots', content: 'index, follow' },
  ],
  tags: [
    'jwt decode',
    'jwt token decode',
    'decode jwt',
    'jwt decode online',
    'RFC 7519',
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
