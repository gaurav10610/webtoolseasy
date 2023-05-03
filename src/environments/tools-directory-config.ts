import { AppDisplayConfig } from 'src/app/@types/config';

export enum AppDisplayNames {
  VIDEO_CONVERTER = 'Video Converter',
  SCREEN_RECORDER = 'Screen Recorder',
  TEXT_COMPARE = 'Text File Difference',
  UUID_GENERATOR = 'UUID Generator',
  JWT_DECODER = 'JWT Decoder',
  IMAGE_COMPRESSOR = 'Image Compressor',
  JS_FORMATTER = 'Javascript Formatter',
  JSON_FORMATTER = 'JSON Formatter',
  HTML_FORMATTER = 'HTML Formatter',
  CSS_FORMATTER = 'CSS Formatter',
  JSON_VIEWER = 'JSON Viewer',
  PASSWORD_GENERATOR = 'Password Generator',
}

export const appDisplayConfig: AppDisplayConfig[] = [
  {
    applicationId: 'videoconverter',
    displayText: AppDisplayNames.VIDEO_CONVERTER,
    iconName: 'video-convert-icon',
    navigateUrl: '/tools/video-converter',
  },
  {
    applicationId: 'screen-recorder',
    displayText: AppDisplayNames.SCREEN_RECORDER,
    iconName: 'screen-icon',
    navigateUrl: '/tools/screen-recorder',
  },
  {
    applicationId: 'textcompare',
    displayText: AppDisplayNames.TEXT_COMPARE,
    iconName: 'comparison-icon',
    navigateUrl: '/tools/text-compare',
  },
  {
    applicationId: 'uuid',
    displayText: AppDisplayNames.UUID_GENERATOR,
    iconName: 'uuid-icon',
    navigateUrl: '/tools/uuid',
  },
  {
    applicationId: 'jwt',
    displayText: AppDisplayNames.JWT_DECODER,
    iconName: 'jwt-icon',
    navigateUrl: '/tools/jwt',
  },
  {
    applicationId: 'imagecompress',
    displayText: AppDisplayNames.IMAGE_COMPRESSOR,
    iconName: 'image-compress-icon',
    navigateUrl: '/tools/image-compress',
  },
  {
    applicationId: 'jsformatter',
    displayText: AppDisplayNames.JS_FORMATTER,
    iconName: 'js-icon',
    navigateUrl: '/tools/js-formatter',
  },
  {
    applicationId: 'jsonformatter',
    displayText: AppDisplayNames.JSON_FORMATTER,
    iconName: 'json-icon',
    navigateUrl: '/tools/json-formatter',
  },
  {
    applicationId: 'jsonviewer',
    displayText: AppDisplayNames.JSON_VIEWER,
    iconName: 'json-icon',
    navigateUrl: '/tools/json-viewer',
  },
  {
    applicationId: 'htmlformatter',
    displayText: AppDisplayNames.HTML_FORMATTER,
    iconName: 'html-icon',
    navigateUrl: '/tools/html-formatter',
  },
  {
    applicationId: 'cssformatter',
    displayText: AppDisplayNames.CSS_FORMATTER,
    iconName: 'css-icon',
    navigateUrl: '/tools/css-formatter',
  },
  {
    applicationId: 'passwordgenerator',
    displayText: AppDisplayNames.PASSWORD_GENERATOR,
    iconName: 'password-icon',
    navigateUrl: '/tools/password-generator',
  },
];
