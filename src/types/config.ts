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
  UUID_VERSION5_GENERATOR = "uuidv5generator",
  UUID_VERSION3_GENERATOR = "uuidv3generator",
  UUID_VERSION7_GENERATOR = "uuidv7generator",
  GUID_GENERATOR = "guidgenerator",
  ULID_GENERATOR = "ulidgenerator",
  MARKDOWN_EDITOR = "markdowneditor",
  WORD_COUNTER = "wordcounter",
  QR_CODE_GENERATOR = "qrcodegenerator",
  COLOR_PALETTE_GENERATOR = "colorpalettegenerator",
  YAML_FORMATTER = "yamlformatter",
  TIMEZONE_CONVERTER = "timezoneconverter",
  HASH_GENERATOR = "hashgenerator",
  STRING_ESCAPE = "stringescape",
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
  SQL_FORMATTER = "sqlformatter",
  CODE_MINIFIER = "codeminifier",
  TEST_HARDWARE = "testhardware",
  LOREM_IPSUM_GENERATOR = "loremipsumgenerator",
  IP_ADDRESS_LOOKUP = "ipaddresslookup",
  HTML_ENTITIES_ENCODER_DECODER = "htmlentitiesencoderdecoder",
  MARKDOWN_TO_HTML_CONVERTER = "markdowntohtmlconverter",
  COLOR_CONVERTER = "colorconverter",
  UNIX_TIMESTAMP_CONVERTER = "unixtimestampconverter",
  PERCENTAGE_CALCULATOR = "percentagecalculator",
  LOAN_EMI_CALCULATOR = "loanemicalculator",
  CURRENCY_CONVERTER = "currencyconverter",
  AGE_CALCULATOR = "agecalculator",
  IMAGE_RESIZER = "imageresizer",
  PDF_MERGE = "pdfmerge",
  PDF_SPLIT = "pdfsplit",
  PDF_COMPRESS = "pdfcompress",
  PDF_TO_IMAGES = "pdftoimages",
  IMAGES_TO_PDF = "imagestopdf",
  JSON_TO_CSV = "jsontocsv",
  SIGNATURE_GENERATOR = "signaturegenerator",
  TEXT_SUMMARIZER = "textsummarizer",
  INVOICE_GENERATOR = "invoicegenerator",
  PARAPHRASING_TOOL = "paraphrasingtool",
  CSV_TO_JSON = "csvtojson",
  SIP_CALCULATOR = "sipcalculator",
  RETIREMENT_CALCULATOR = "retirementcalculator",
  MORTGAGE_CALCULATOR = "mortgagecalculator",
  ROI_CALCULATOR = "roicalculator",
  BMI_CALCULATOR = "bmicalculator",
  UNIT_CONVERTER = "unitconverter",
  RANDOM_NUMBER_GENERATOR = "randomnumbergenerator",
  DATE_CALCULATOR = "datecalculator",
  DISCOUNT_CALCULATOR = "discountcalculator",
  TIP_CALCULATOR = "tipcalculator",
  GPA_CALCULATOR = "gpacalculator",
  CALORIE_CALCULATOR = "caloriecalculator",
  SALARY_CALCULATOR = "salarycalculator",
  TIME_DURATION_CALCULATOR = "timedurationcalculator",
  FRACTION_CALCULATOR = "fractioncalculator",
  TEXT_TO_SPEECH = "texttospeech",
  JSON_TO_YAML = "jsontoyaml",
  WEBCAM_RECORDER = "webcamrecorder",
  AUDIO_RECORDER = "audiorecorder",
  GIF_MAKER = "gifmaker",
  VIDEO_COMPRESSOR = "videocompressor",
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
