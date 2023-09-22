import { ApplicationConfig } from 'src/app/@types/config';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools';
const pageTitle =
  'Free Online Web Tools Directory: Discover Useful Tools to Boost Your Productivity';
const pageDescription = `Looking for the best free online web tools to help you with your work, studies, or personal projects? Look no further! WebToolsEasy features multiple free web tools that can help you boost your productivity and get things done more efficiently. Browse our categories and find the perfect tool for your needs, whether you're looking for a way to edit photos, create videos, manage your projects, or learn new skills.`;
const imageUrl = `${environment.screenshotsBaseUrl}/tools-directory.png`;

export const componentConfig: ApplicationConfig = {
  navigationUrl,
  mainHeading:
    'Free Online Web Tools Directory: Discover Useful Tools to Boost Your Productivity',
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
      iconName: 'qr-code',
      iconRelativeUrl: 'qr-code.svg',
    },
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
    {
      iconName: 'markdown-icon',
      iconRelativeUrl: 'markdown.svg',
    },
    {
      iconName: 'word-icon',
      iconRelativeUrl: 'word.svg',
    },
  ],
};
