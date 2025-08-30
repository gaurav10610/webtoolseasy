export enum ApplicationIds {
  VIDEO_CONVERTER = "videoconverter",
  SCREEN_RECORDER = "screenrecorder",
  TEXT_COMPARE = "textcompare",
  JWT_DECODER = "jwtdecoder",
  IMAGE_COMPRESSOR = "imagecompressor",
  IMAGE_FORMAT_CONVERTER = "imageformatconverter",
  JS_FORMATTER = "jsformatter",
  JSON_FORMATTER = "jsonformatter",
  HTML_FORMATTER = "htmlformatter",
  CSS_FORMATTER = "cssformatter",
  JSON_VIEWER = "jsonviewer",
  PASSWORD_GENERATOR = "passwordgenerator",
  BASE64_ENCODE = "base64encoder",
  BASE64_DECODE = "base64decoder",
  CRON_GENERATOR = "crongenerator",
  IMAGE_CROPPER = "imagecropper",
  UUID_VERSION1_GENERATOR = "uuidv1generator",
  UUID_VERSION4_GENERATOR = "uuidv4generator",
  GUID_GENERATOR = "guidgenerator",
  MARKDOWN_EDITOR = "markdowneditor",
  WORD_COUNTER = "wordcounter",
  QR_CODE_GENERATOR = "qrcodegenerator",
  COLOR_PALETTE_GENERATOR = "colorpalettegenerator",
  YAML_FORMATTER = "yamlformatter",
  HTML_EDITOR = "htmleditor",
  JS_EDITOR = "jseditor",
  XML_TO_JSON = "xmltojson",
  COMPOUND_INTEREST_CALCULATOR = "compoundinterestcalculator",
  JS_COMPILER = "jscompiler",
  TEXT_EDITOR = "texteditor",
  CASE_CONVERETR = "caseconverter",
  IMAGE_TO_TEXT = "imagetotext",
  PYTHON_COMPILER = "pythoncompiler",
  CSV_VIEWER = "csvviewer",
  PDF_EDITOR = "pdf-editor",
  SPEECH_TO_TEXT = "speech-to-text",
  REGEX_TESTER = "regex-tester",
  HTML_TO_MARKDOWN = "html-to-markdown",
  VIDEO_EDITOR = "video-editor",
  URL_ENCODER_DECODER = "urlencoderdecoder",
  SQL_PRACTICE_EDITOR = "sql-practice-editor",
}

export interface BaseAppConfig {
  displayText: string;
  navigateUrl: string;
  category: AppCategory;
}
export interface AppNavigationConfig extends BaseAppConfig {
  applicationId: string;
  iconRelativeUrl: string;
}

export interface ApplicationConfig {
  mainHeading?: string;
  navigationUrl: string;
  pageTitle: string;
  tags: string[];
  relatedTools: ApplicationIds[];
  structuredData?: StructuredDataConfig;
}

export interface StructuredDataConfig {
  webApplication?: Record<string, unknown>;
  breadcrumb?: Record<string, unknown>;
  organization?: Record<string, unknown>;
  website?: Record<string, unknown>;
}

export enum AppCategory {
  TEXT = "Text",
  MISCELLANEOUS = "Miscellaneous",
  PROGRAMMING = "Programming",
  ONLINE_EDITORS = "Online Editors",
  MEDIA = "Media",
  FINANCE = "Finance",
}

export interface AppCatalogue {
  category: string;
  apps: AppNavigationConfig[];
}

export interface AppContext {
  id: ApplicationIds;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
