import { ApplicationIds } from "@/types/config";

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface CategoryFeature {
  emoji: string;
  title: string;
  description: string;
}

export interface CategorySubSection {
  emoji: string;
  title: string;
  description: string;
}

export interface RelatedCategory {
  slug: string;
  name: string;
  colorClass: string;
  hoverColorClass: string;
}

export interface CategoryConfig {
  slug: string;
  name: string;
  emoji: string;
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  heroTitle: string;
  heroDescription: string;
  heroGradient: string;
  heroBorderColor: string;
  heroTitleColor: string;
  toolIds: ApplicationIds[];
  breadcrumbCategory: string;
  featuresTitle: string;
  features: CategoryFeature[];
  subSectionsTitle?: string;
  subSections?: CategorySubSection[];
  faqs: CategoryFAQ[];
  relatedCategories: RelatedCategory[];
}

// PDF Tools Category Configuration
export const pdfToolsConfig: CategoryConfig = {
  slug: "pdf-tools",
  name: "PDF Tools",
  emoji: "🔒",
  pageTitle: "Free PDF Tools Online | Edit, Merge, Split, Compress PDFs",
  pageDescription:
    "Free privacy-first PDF tools. Edit, merge, split, compress PDFs in your browser. No upload, 100% secure. PDF to Word, images to PDF converter & more.",
  keywords:
    "free PDF tools, PDF editor online, merge PDF, split PDF, compress PDF, PDF to Word, images to PDF, private PDF tools, no upload PDF, client-side PDF",
  heroTitle: "🔒 Free Private PDF Tools",
  heroDescription:
    "Edit, merge, split, and convert PDFs directly in your browser. No uploads, no servers, no tracking. Your documents stay 100% private.",
  heroGradient: "from-red-50 to-orange-50",
  heroBorderColor: "border-red-200",
  heroTitleColor: "!text-red-800",
  breadcrumbCategory: "Media",
  toolIds: [
    ApplicationIds.PDF_EDITOR,
    ApplicationIds.PDF_MERGE,
    ApplicationIds.PDF_SPLIT,
    ApplicationIds.PDF_COMPRESS,
    ApplicationIds.PDF_TO_IMAGES,
    ApplicationIds.IMAGES_TO_PDF,
    ApplicationIds.PDF_TO_WORD,
    ApplicationIds.WORD_TO_PDF,
  ],
  featuresTitle: "Why Use Our PDF Tools?",
  features: [
    {
      emoji: "🔐",
      title: "Complete Privacy",
      description:
        "All processing happens in your browser. Your PDFs never leave your device or touch our servers.",
    },
    {
      emoji: "⚡",
      title: "Lightning Fast",
      description:
        "No upload or download wait times. Processing starts instantly on your local machine.",
    },
    {
      emoji: "🌐",
      title: "Works Offline",
      description:
        "Once loaded, use these tools without an internet connection. Perfect for sensitive documents.",
    },
  ],
  faqs: [
    {
      question: "Are these PDF tools really free?",
      answer:
        "Yes, all our PDF tools are completely free with no usage limits, no watermarks, and no registration required.",
    },
    {
      question: "How is my privacy protected?",
      answer:
        "All PDF processing happens 100% in your browser using JavaScript. Your files never leave your device - we have no servers that handle your documents.",
    },
    {
      question: "What file size limits are there?",
      answer:
        "Since processing happens locally, limits depend on your device's memory. Most modern devices handle PDFs up to 100MB+ easily.",
    },
    {
      question: "Can I use these tools on mobile?",
      answer:
        "Yes, all tools are fully responsive and work on smartphones and tablets. Processing happens right on your mobile device.",
    },
  ],
  relatedCategories: [
    {
      slug: "image-tools",
      name: "Image Tools",
      colorClass: "bg-blue-50 text-blue-700",
      hoverColorClass: "hover:bg-blue-100",
    },
    {
      slug: "dev-tools",
      name: "Developer Tools",
      colorClass: "bg-green-50 text-green-700",
      hoverColorClass: "hover:bg-green-100",
    },
    {
      slug: "text-tools",
      name: "Text Tools",
      colorClass: "bg-purple-50 text-purple-700",
      hoverColorClass: "hover:bg-purple-100",
    },
  ],
};

// Image Tools Category Configuration
export const imageToolsConfig: CategoryConfig = {
  slug: "image-tools",
  name: "Image Tools",
  emoji: "🖼️",
  pageTitle:
    "Free Image Tools Online | Compress, Resize, Edit Images Privately",
  pageDescription:
    "Free privacy-first image tools. Compress, resize, crop, convert images in your browser. No upload, 100% secure. Background remover, format converter & more.",
  keywords:
    "free image tools, image compressor, image resizer, crop image, background remover, image converter, private image tools, no upload, client-side image editing",
  heroTitle: "🖼️ Free Private Image Tools",
  heroDescription:
    "Compress, resize, crop, and convert images directly in your browser. No uploads, no servers, no tracking. Your images stay 100% private.",
  heroGradient: "from-blue-50 to-cyan-50",
  heroBorderColor: "border-blue-200",
  heroTitleColor: "!text-blue-800",
  breadcrumbCategory: "Media",
  toolIds: [
    ApplicationIds.IMAGE_COMPRESSOR,
    ApplicationIds.IMAGE_RESIZER,
    ApplicationIds.IMAGE_CROPPER,
    ApplicationIds.IMAGE_FORMAT_CONVERTER,
    ApplicationIds.IMAGE_TO_TEXT,
    ApplicationIds.BACKGROUND_REMOVER,
    ApplicationIds.GIF_MAKER,
    ApplicationIds.FAVICON_GENERATOR,
    ApplicationIds.QR_CODE_GENERATOR,
    ApplicationIds.BARCODE_GENERATOR,
    ApplicationIds.MEME_GENERATOR,
    ApplicationIds.ASCII_ART_GENERATOR,
  ],
  featuresTitle: "Why Use Our Image Tools?",
  features: [
    {
      emoji: "🔐",
      title: "Complete Privacy",
      description:
        "All processing happens in your browser. Your images never leave your device or touch our servers.",
    },
    {
      emoji: "⚡",
      title: "Instant Processing",
      description:
        "No upload wait times. Image compression and editing starts instantly on your local machine.",
    },
    {
      emoji: "🎨",
      title: "Professional Quality",
      description:
        "Get professional-grade compression and editing without expensive software subscriptions.",
    },
  ],
  faqs: [
    {
      question: "Are these image tools really free?",
      answer:
        "Yes, all our image tools are completely free with no usage limits, no watermarks, and no registration required.",
    },
    {
      question: "How does privacy-first image compression work?",
      answer:
        "All image processing happens 100% in your browser using JavaScript. Your images never leave your device - we have no servers that handle your files.",
    },
    {
      question: "What compression quality can I expect?",
      answer:
        "Our tools offer adjustable quality settings. You can typically reduce file sizes by 50-80% while maintaining excellent visual quality.",
    },
    {
      question: "Can I batch process multiple images?",
      answer:
        "Yes, many of our image tools support batch processing. Select multiple images at once to compress, resize, or convert them all together.",
    },
  ],
  relatedCategories: [
    {
      slug: "pdf-tools",
      name: "PDF Tools",
      colorClass: "bg-red-50 text-red-700",
      hoverColorClass: "hover:bg-red-100",
    },
    {
      slug: "dev-tools",
      name: "Developer Tools",
      colorClass: "bg-green-50 text-green-700",
      hoverColorClass: "hover:bg-green-100",
    },
    {
      slug: "text-tools",
      name: "Text Tools",
      colorClass: "bg-purple-50 text-purple-700",
      hoverColorClass: "hover:bg-purple-100",
    },
  ],
};

// Developer Tools Category Configuration
export const devToolsConfig: CategoryConfig = {
  slug: "dev-tools",
  name: "Developer Tools",
  emoji: "🛠️",
  pageTitle: "Free Developer Tools Online | JSON, Code Formatters, Encoders",
  pageDescription:
    "Free privacy-first developer tools. JSON formatter, code minifier, Base64 encoder, JWT decoder, regex tester & more. 100% client-side, no server uploads.",
  keywords:
    "free developer tools, JSON formatter, code minifier, Base64 encoder, JWT decoder, regex tester, UUID generator, hash generator, client-side tools",
  heroTitle: "🛠️ Free Private Developer Tools",
  heroDescription:
    "Format, encode, decode, and generate code directly in your browser. No uploads, no servers, no tracking. Your code stays 100% private.",
  heroGradient: "from-green-50 to-emerald-50",
  heroBorderColor: "border-green-200",
  heroTitleColor: "!text-green-800",
  breadcrumbCategory: "Programming",
  toolIds: [
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.CSS_FORMATTER,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.YAML_FORMATTER,
    ApplicationIds.SQL_FORMATTER,
    ApplicationIds.CODE_MINIFIER,
    ApplicationIds.BASE64_ENCODE,
    ApplicationIds.BASE64_DECODE,
    ApplicationIds.JWT_DECODER,
    ApplicationIds.HASH_GENERATOR,
    ApplicationIds.UUID_VERSION4_GENERATOR,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.UUID_VERSION7_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
    ApplicationIds.ULID_GENERATOR,
    ApplicationIds.REGEX_TESTER,
    ApplicationIds.CRON_GENERATOR,
    ApplicationIds.XML_TO_JSON,
    ApplicationIds.JSON_TO_CSV,
    ApplicationIds.CSV_TO_JSON,
    ApplicationIds.JSON_TO_YAML,
    ApplicationIds.URL_ENCODER_DECODER,
    ApplicationIds.STRING_ESCAPE,
    ApplicationIds.HTML_ENTITIES_ENCODER_DECODER,
    ApplicationIds.UNIX_TIMESTAMP_CONVERTER,
    ApplicationIds.DIFF_CHECKER,
    ApplicationIds.LOREM_IPSUM_GENERATOR,
    ApplicationIds.TABLE_GENERATOR,
  ],
  featuresTitle: "Why Developers Love These Tools",
  features: [
    {
      emoji: "🔐",
      title: "Safe for Secrets",
      description:
        "JWT tokens, API keys, and sensitive code never leave your browser. Perfect for production debugging.",
    },
    {
      emoji: "⚡",
      title: "Instant Results",
      description:
        "No network latency. Format, encode, and transform data instantly without waiting for server responses.",
    },
    {
      emoji: "🌐",
      title: "Works Anywhere",
      description:
        "Use these tools in air-gapped environments, VPNs, or restricted networks. No external dependencies.",
    },
  ],
  subSectionsTitle: "Tool Categories",
  subSections: [
    {
      emoji: "📝",
      title: "Formatters",
      description:
        "JSON, JavaScript, HTML, CSS, YAML, SQL formatters with customizable styling.",
    },
    {
      emoji: "🔄",
      title: "Encoders/Decoders",
      description:
        "Base64, URL encoding, HTML entities, string escaping, and more.",
    },
    {
      emoji: "🔑",
      title: "Generators",
      description:
        "UUID, GUID, ULID, hash, password, and other secure generators.",
    },
    {
      emoji: "🔄",
      title: "Converters",
      description:
        "XML to JSON, JSON to CSV, JSON to YAML, and format converters.",
    },
    {
      emoji: "🧪",
      title: "Testers",
      description:
        "Regex tester, JWT decoder, diff checker for code comparison.",
    },
    {
      emoji: "⏰",
      title: "Utilities",
      description:
        "Unix timestamp converter, cron generator, lorem ipsum generator.",
    },
  ],
  faqs: [
    {
      question: "Is it safe to paste JWT tokens or API keys?",
      answer:
        "Yes, absolutely safe. All decoding and processing happens 100% in your browser. Your tokens never leave your device - we have no backend servers that see your data.",
    },
    {
      question: "Can I use these tools for production debugging?",
      answer:
        "Yes, these tools are perfect for production debugging because your sensitive data stays local. Many developers prefer these tools over online alternatives for this reason.",
    },
    {
      question: "Do these tools work in air-gapped environments?",
      answer:
        "Once loaded, all tools work completely offline. You can even save the page locally and use it without any network connection.",
    },
    {
      question: "What programming languages do the formatters support?",
      answer:
        "We support JSON, JavaScript, HTML, CSS, YAML, and SQL formatting. Each formatter has customizable indentation and styling options.",
    },
  ],
  relatedCategories: [
    {
      slug: "pdf-tools",
      name: "PDF Tools",
      colorClass: "bg-red-50 text-red-700",
      hoverColorClass: "hover:bg-red-100",
    },
    {
      slug: "image-tools",
      name: "Image Tools",
      colorClass: "bg-blue-50 text-blue-700",
      hoverColorClass: "hover:bg-blue-100",
    },
    {
      slug: "text-tools",
      name: "Text Tools",
      colorClass: "bg-purple-50 text-purple-700",
      hoverColorClass: "hover:bg-purple-100",
    },
  ],
};

// Text Tools Category Configuration
export const textToolsConfig: CategoryConfig = {
  slug: "text-tools",
  name: "Text Tools",
  emoji: "✍️",
  pageTitle: "Free Text Tools Online | Word Counter, Case Converter, Markdown",
  pageDescription:
    "Free privacy-first text tools. Word counter, case converter, text compare, markdown editor & more. 100% client-side processing, no server uploads.",
  keywords:
    "free text tools, word counter, case converter, text compare, markdown editor, text summarizer, paraphrasing tool, client-side text tools",
  heroTitle: "✍️ Free Private Text Tools",
  heroDescription:
    "Count words, convert cases, compare texts, and edit markdown directly in your browser. No uploads, no servers, no tracking. Your content stays 100% private.",
  heroGradient: "from-purple-50 to-pink-50",
  heroBorderColor: "border-purple-200",
  heroTitleColor: "!text-purple-800",
  breadcrumbCategory: "Text",
  toolIds: [
    ApplicationIds.WORD_COUNTER,
    ApplicationIds.CASE_CONVERETR,
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.TEXT_SUMMARIZER,
    ApplicationIds.PARAPHRASING_TOOL,
    ApplicationIds.TEXT_EDITOR,
    ApplicationIds.LOREM_IPSUM_GENERATOR,
    ApplicationIds.HTML_TO_MARKDOWN,
    ApplicationIds.MARKDOWN_TO_HTML_CONVERTER,
    ApplicationIds.TEXT_TO_SPEECH,
    ApplicationIds.SPEECH_TO_TEXT,
  ],
  featuresTitle: "Why Use Our Text Tools?",
  features: [
    {
      emoji: "🔐",
      title: "Document Privacy",
      description:
        "Your documents and text stay on your device. Perfect for confidential content and sensitive information.",
    },
    {
      emoji: "📊",
      title: "Accurate Analysis",
      description:
        "Get precise word counts, character counts, reading time estimates, and text statistics instantly.",
    },
    {
      emoji: "✏️",
      title: "Writing Assistance",
      description:
        "Summarize text, paraphrase content, and improve your writing with our AI-powered tools.",
    },
  ],
  subSectionsTitle: "Common Use Cases",
  subSections: [
    {
      emoji: "📝",
      title: "Content Writers",
      description:
        "Track word count for articles, meet character limits for social media, and estimate reading time.",
    },
    {
      emoji: "🎓",
      title: "Students & Academics",
      description:
        "Check essay word counts, compare document versions, and convert between formats.",
    },
    {
      emoji: "💼",
      title: "Professionals",
      description:
        "Compare contracts, convert case formats, and work with markdown documentation.",
    },
    {
      emoji: "👨‍💻",
      title: "Developers",
      description:
        "Write documentation in markdown, convert between HTML and markdown, generate lorem ipsum.",
    },
  ],
  faqs: [
    {
      question: "How accurate is the word counter?",
      answer:
        "Our word counter uses industry-standard algorithms to accurately count words, characters, sentences, and paragraphs. It handles multiple languages and special characters correctly.",
    },
    {
      question: "Can I use these tools for confidential documents?",
      answer:
        "Yes, these tools are ideal for confidential documents. All processing happens in your browser - your text never leaves your device or reaches our servers.",
    },
    {
      question: "Does the markdown editor support live preview?",
      answer:
        "Yes, our markdown editor provides real-time preview as you type. You can see your formatted output instantly and export to HTML.",
    },
    {
      question: "What case formats does the case converter support?",
      answer:
        "Our case converter supports UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and more.",
    },
  ],
  relatedCategories: [
    {
      slug: "pdf-tools",
      name: "PDF Tools",
      colorClass: "bg-red-50 text-red-700",
      hoverColorClass: "hover:bg-red-100",
    },
    {
      slug: "dev-tools",
      name: "Developer Tools",
      colorClass: "bg-green-50 text-green-700",
      hoverColorClass: "hover:bg-green-100",
    },
    {
      slug: "image-tools",
      name: "Image Tools",
      colorClass: "bg-blue-50 text-blue-700",
      hoverColorClass: "hover:bg-blue-100",
    },
  ],
};

// Calculator Tools Category Configuration
export const calculatorsConfig: CategoryConfig = {
  slug: "calculators",
  name: "Calculator Tools",
  emoji: "🧮",
  pageTitle: "Free Calculator Tools | EMI, SIP, ROI, Mortgage Calculators",
  pageDescription:
    "Free privacy-first calculator tools. EMI, SIP, mortgage, ROI, percentage calculators & more. 100% client-side, no data tracking or server uploads.",
  keywords:
    "free calculator tools, EMI calculator, SIP calculator, mortgage calculator, ROI calculator, percentage calculator, loan calculator, client-side calculator",
  heroTitle: "🧮 Free Private Calculator Tools",
  heroDescription:
    "Calculate EMI, SIP, mortgage, and more directly in your browser. No uploads, no servers, no tracking. Your financial data stays 100% private.",
  heroGradient: "from-amber-50 to-yellow-50",
  heroBorderColor: "border-amber-200",
  heroTitleColor: "!text-amber-800",
  breadcrumbCategory: "Finance",
  toolIds: [
    ApplicationIds.COMPOUND_INTEREST_CALCULATOR,
    ApplicationIds.LOAN_EMI_CALCULATOR,
    ApplicationIds.SIP_CALCULATOR,
    ApplicationIds.RETIREMENT_CALCULATOR,
    ApplicationIds.MORTGAGE_CALCULATOR,
    ApplicationIds.ROI_CALCULATOR,
    ApplicationIds.PERCENTAGE_CALCULATOR,
    ApplicationIds.DISCOUNT_CALCULATOR,
    ApplicationIds.TIP_CALCULATOR,
    ApplicationIds.BMI_CALCULATOR,
    ApplicationIds.CALORIE_CALCULATOR,
    ApplicationIds.GPA_CALCULATOR,
    ApplicationIds.SALARY_CALCULATOR,
    ApplicationIds.AGE_CALCULATOR,
    ApplicationIds.DATE_CALCULATOR,
    ApplicationIds.TIME_DURATION_CALCULATOR,
    ApplicationIds.FRACTION_CALCULATOR,
    ApplicationIds.UNIT_CONVERTER,
    ApplicationIds.CURRENCY_CONVERTER,
  ],
  featuresTitle: "Why Use Our Calculators?",
  features: [
    {
      emoji: "🔐",
      title: "Financial Privacy",
      description:
        "Your financial data stays on your device. No tracking, no profiling, no data selling.",
    },
    {
      emoji: "📊",
      title: "Accurate Results",
      description:
        "Industry-standard formulas for precise calculations. Includes detailed breakdowns and charts.",
    },
    {
      emoji: "⚡",
      title: "Instant Calculations",
      description:
        "Real-time results as you type. No waiting for server responses or page reloads.",
    },
  ],
  subSectionsTitle: "Calculator Categories",
  subSections: [
    {
      emoji: "💰",
      title: "Financial Calculators",
      description:
        "EMI, SIP, compound interest, ROI, mortgage, and loan calculators.",
    },
    {
      emoji: "📐",
      title: "Math Calculators",
      description:
        "Percentage, fraction, unit converter, and basic math calculators.",
    },
    {
      emoji: "🏋️",
      title: "Health Calculators",
      description: "BMI, calorie, and other health-related calculators.",
    },
    {
      emoji: "📅",
      title: "Date & Time",
      description:
        "Age calculator, date calculator, time duration, and timezone tools.",
    },
    {
      emoji: "🎓",
      title: "Academic",
      description: "GPA calculator and other academic calculation tools.",
    },
    {
      emoji: "💵",
      title: "Everyday",
      description:
        "Tip calculator, discount calculator, salary calculator, and more.",
    },
  ],
  faqs: [
    {
      question: "Is my financial data safe with these calculators?",
      answer:
        "Yes, absolutely. All calculations happen 100% in your browser. Your financial data never leaves your device - we have no servers that see your numbers.",
    },
    {
      question: "How accurate are the EMI and loan calculations?",
      answer:
        "Our calculators use industry-standard amortization formulas. The results are accurate for planning purposes. Always verify with your lender for exact figures.",
    },
    {
      question: "Can I export the calculation results?",
      answer:
        "Many calculators provide detailed breakdowns and amortization tables that you can copy or print for your records.",
    },
    {
      question: "Are the currency exchange rates up to date?",
      answer:
        "The currency converter fetches current exchange rates. For precise financial transactions, verify with your bank or financial institution.",
    },
  ],
  relatedCategories: [
    {
      slug: "pdf-tools",
      name: "PDF Tools",
      colorClass: "bg-red-50 text-red-700",
      hoverColorClass: "hover:bg-red-100",
    },
    {
      slug: "dev-tools",
      name: "Developer Tools",
      colorClass: "bg-green-50 text-green-700",
      hoverColorClass: "hover:bg-green-100",
    },
    {
      slug: "text-tools",
      name: "Text Tools",
      colorClass: "bg-purple-50 text-purple-700",
      hoverColorClass: "hover:bg-purple-100",
    },
  ],
};

// All category configurations indexed by slug
export const categoryConfigs: Record<string, CategoryConfig> = {
  "pdf-tools": pdfToolsConfig,
  "image-tools": imageToolsConfig,
  "dev-tools": devToolsConfig,
  "text-tools": textToolsConfig,
  calculators: calculatorsConfig,
};

// Get all category slugs for static generation
export function getAllCategorySlugs(): string[] {
  return Object.keys(categoryConfigs);
}

// Get category config by slug
export function getCategoryConfig(slug: string): CategoryConfig | undefined {
  return categoryConfigs[slug];
}
