import { ApplicationConfig } from 'src/app/@types/config';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools';
const pageTitle = 'Free Online Web Tools - webtoolseasy.com';
const pageDescription =
  'Discover a comprehensive directory of free web tools online. Find the perfect tool for your needs and streamline your online experience.';
const imageUrl = `${environment.screenshotsBaseUrl}/tools-directory.png`;

export const componentConfig: ApplicationConfig = {
  navigationUrl,
  mainHeading: 'Web Tools Directory',
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
  tags: [],
  icons: [
    {
      iconName: 'uuid-icon',
      iconRelativeUrl: 'uuid-icon.svg',
    },
    {
      iconName: 'jwt-icon',
      iconRelativeUrl: 'jwt-icon.svg',
    },
    {
      iconName: 'json-icon',
      iconRelativeUrl: 'json-icon.svg',
    },
    {
      iconName: 'image-icon',
      iconRelativeUrl: 'image-icon.svg',
    },
    {
      iconName: 'js-icon',
      iconRelativeUrl: 'js-icon.svg',
    },
    {
      iconName: 'css-icon',
      iconRelativeUrl: 'css.svg',
    },
    {
      iconName: 'html-icon',
      iconRelativeUrl: 'html.svg',
    },
    {
      iconName: 'screen-icon',
      iconRelativeUrl: 'screen.svg',
    },
    {
      iconName: 'comparison-icon',
      iconRelativeUrl: 'comparison.svg',
    },
    {
      iconName: 'video-convert-icon',
      iconRelativeUrl: 'video-convert.svg',
    },
    {
      iconName: 'password-icon',
      iconRelativeUrl: 'password.svg',
    },
    {
      iconName: 'file-encode-icon',
      iconRelativeUrl: 'file-encode.svg',
    },
    {
      iconName: 'file-decode-icon',
      iconRelativeUrl: 'file-decode.svg',
    },
    {
      iconName: 'cron-icon',
      iconRelativeUrl: 'cron.svg',
    },
  ],
};
