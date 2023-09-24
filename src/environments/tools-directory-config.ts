import { AppDisplayConfig } from 'src/app/@types/config';
import * as appConfigJson from './apps.json';

export enum AppDisplayNames {
  VIDEO_CONVERTER = 'Video to Audio Converter',
  SCREEN_RECORDER = 'Free Screen Recorder',
  TEXT_COMPARE = 'Online Text Compare',
  JWT_DECODER = 'JWT Decoder',
  IMAGE_COMPRESSOR = 'Free Image Compressor',
  JS_FORMATTER = 'Online Javascript Formatter',
  JSON_FORMATTER = 'Online JSON Formatter',
  HTML_FORMATTER = 'Online HTML Formatter',
  CSS_FORMATTER = 'Online CSS Formatter',
  JSON_VIEWER = 'Online JSON Viewer',
  PASSWORD_GENERATOR = 'Random Password Generator',
  BASE64_ENCODE = 'Base64 Encoder',
  BASE64_DECODE = 'Base64 Decoder',
  CRON_GENERATOR = 'Cron Expression Generator',
  IMAGE_CROPPER = 'Free Image Cropper',
  UUID_VERSION1_GENERATOR = 'UUID V1 Generator',
  UUID_VERSION4_GENERATOR = 'UUID V4 Generator',
  GUID_GENERATOR = 'GUID Generator',
  MARKDOWN_EDITOR = 'Markdown Editor',
  WORD_COUNTER = 'Word Counter',
  QR_CODE_GENERATOR = 'QR Code Generator',
}

export enum ApplicationIds {
  VIDEO_CONVERTER = 'videoconverter',
  SCREEN_RECORDER = 'screenrecorder',
  TEXT_COMPARE = 'textcompare',
  JWT_DECODER = 'jwtdecoder',
  IMAGE_COMPRESSOR = 'imagecompressor',
  JS_FORMATTER = 'jsformatter',
  JSON_FORMATTER = 'jsonformatter',
  HTML_FORMATTER = 'htmlformatter',
  CSS_FORMATTER = 'cssformatter',
  JSON_VIEWER = 'jsonviewer',
  PASSWORD_GENERATOR = 'passwordgenerator',
  BASE64_ENCODE = 'base64encoder',
  BASE64_DECODE = 'base64decoder',
  CRON_GENERATOR = 'crongenerator',
  IMAGE_CROPPER = 'imagecropper',
  UUID_VERSION1_GENERATOR = 'uuidv1generator',
  UUID_VERSION4_GENERATOR = 'uuidv4generator',
  GUID_GENERATOR = 'guidgenerator',
  MARKDOWN_EDITOR = 'markdowneditor',
  WORD_COUNTER = 'wordcounter',
  QR_CODE_GENERATOR = 'qrcodegenerator',
}

const appsConfigMap: Map<string, AppDisplayConfig> = new Map(
  Object.entries(appConfigJson)
);
appsConfigMap.delete('default');

export const applicationConfig: Map<string, AppDisplayConfig> = appsConfigMap;
