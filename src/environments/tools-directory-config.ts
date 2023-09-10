import { AppDisplayConfig } from 'src/app/@types/config';

export enum AppDisplayNames {
  VIDEO_CONVERTER = 'Video to Audio Converter',
  SCREEN_RECORDER = 'Online Screen Recorder',
  TEXT_COMPARE = 'Online Text Difference',
  UUID_GENERATOR = 'Online UUID Generator',
  JWT_DECODER = 'Online JWT Decoder',
  IMAGE_COMPRESSOR = 'Online Image Compressor',
  JS_FORMATTER = 'Online Javascript Formatter',
  JSON_FORMATTER = 'Online JSON Formatter',
  HTML_FORMATTER = 'Online HTML Formatter',
  CSS_FORMATTER = 'Online CSS Formatter',
  JSON_VIEWER = 'Online JSON Viewer',
  PASSWORD_GENERATOR = 'Online Password Generator',
  BASE64_ENCODE = 'Base64 Encode',
  BASE64_DECODE = 'Base64 Decode',
  CRON_GENERATOR = 'Cron Expression Generator',
  IMAGE_CROPPER = 'Image Cropper',
}

export const appDisplayConfig: AppDisplayConfig[] = [
  {
    applicationId: 'passwordgenerator',
    displayText: AppDisplayNames.PASSWORD_GENERATOR,
    iconName: 'password-icon',
    navigateUrl: '/tools/password-generator',
  },
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
    iconName: 'image-icon',
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
    applicationId: 'base64encoder',
    displayText: AppDisplayNames.BASE64_ENCODE,
    iconName: 'file-encode-icon',
    navigateUrl: '/tools/base64-encode',
  },
  {
    applicationId: 'base64decoder',
    displayText: AppDisplayNames.BASE64_DECODE,
    iconName: 'file-decode-icon',
    navigateUrl: '/tools/base64-decode',
  },
  {
    applicationId: 'crongenerator',
    displayText: AppDisplayNames.CRON_GENERATOR,
    iconName: 'cron-icon',
    navigateUrl: '/tools/cron-expression',
  },
  {
    applicationId: 'imagecropper',
    displayText: AppDisplayNames.IMAGE_CROPPER,
    iconName: 'image-icon',
    navigateUrl: '/tools/crop-image',
  },
];
