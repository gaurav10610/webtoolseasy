import { AppDisplayConfig } from 'src/app/@types/config';

export const appDisplayConfig: AppDisplayConfig[] = [
  {
    applicationId: 'screen-recorder',
    displayText: 'Screen Recorder',
    iconName: 'screen-icon',
    navigateUrl: '/tools/screen-recorder',
  },
  {
    applicationId: 'textcompare',
    displayText: 'Text Compare',
    iconName: 'comparison-icon',
    navigateUrl: '/tools/text-compare',
  },
  {
    applicationId: 'uuid',
    displayText: 'UUID Generator',
    iconName: 'uuid-icon',
    navigateUrl: '/tools/uuid',
  },
  {
    applicationId: 'jwt',
    displayText: 'JWT Decoder',
    iconName: 'jwt-icon',
    navigateUrl: '/tools/jwt',
  },
  {
    applicationId: 'imagecompress',
    displayText: 'Compress Image',
    iconName: 'image-compress-icon',
    navigateUrl: '/tools/image-compress',
  },
  {
    applicationId: 'jsformatter',
    displayText: 'JS Formatter',
    iconName: 'js-icon',
    navigateUrl: '/tools/js-formatter',
  },
  {
    applicationId: 'jsonformatter',
    displayText: 'JSON Formatter',
    iconName: 'json-icon',
    navigateUrl: '/tools/json-formatter',
  },
  {
    applicationId: 'htmlformatter',
    displayText: 'HTML Formatter',
    iconName: 'html-icon',
    navigateUrl: '/tools/html-formatter',
  },
  {
    applicationId: 'cssformatter',
    displayText: 'CSS Formatter',
    iconName: 'css-icon',
    navigateUrl: '/tools/css-formatter',
  },
  {
    applicationId: 'soon',
    displayText: 'More Tools Coming Soon',
    iconName: 'soon-icon',
    navigateUrl: '',
  },
];
