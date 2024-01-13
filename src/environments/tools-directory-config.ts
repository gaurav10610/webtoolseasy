import { AppNavigationConfig } from 'src/app/@types/config';
import * as appConfigJson from './apps.json';

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
  HTML_EDITOR = 'htmleditor',
  JS_EDITOR = 'jseditor',
  XML_TO_JSON = 'xmltojson',
  COMPOUND_INTEREST_CALCULATOR = 'compoundinterestcalculator',
  JS_COMPILER = 'jscompiler',
  TEXT_EDITOR = 'texteditor',
  CASE_CONVERETR = 'caseconverter',
}

const appsConfigMap: Map<string, AppNavigationConfig> = new Map(
  Object.entries(appConfigJson)
);

appsConfigMap.delete('default');

export const applicationConfig: Map<string, AppNavigationConfig> =
  appsConfigMap;
