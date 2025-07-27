import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { ApplicationIds } from "@/types/config";

const navigationUrl = "/tools/image-to-text";
const pageTitle = "Free Image to Text Converter | OCR Tool Online";
const pageDescription =
  "Convert images to text instantly with our powerful OCR tool. Extract text from JPG, PNG, JPEG, and other image formats. Free online image to text converter with accurate text recognition. Perfect for digitizing documents, photos, and scanned files.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/image-to-text.png`;

const keywords =
  "image to text converter, extract text from image, OCR online free, convert image to text, photo to text converter, picture text extractor, scan to text, JPG to text, PNG to text, image text recognition, document digitization, text extraction tool";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: "/favicon.png",
  keywords,
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading:
    "Free Online Image to Text Converter: Extract Text from Images Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.TEXT_COMPARE,
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.TEXT_EDITOR,
    ApplicationIds.CASE_CONVERETR,
    ApplicationIds.BASE64_ENCODE,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an Image to Text Converter?",
    blockData: [
      "An image to text converter is a powerful OCR (Optical Character Recognition) tool that extracts text from images and converts them into editable digital text. This technology allows you to transform printed or handwritten text in photos, scanned documents, screenshots, and other image formats into searchable and editable content.",
      "Our free online image to text converter uses advanced OCR technology to accurately recognize and extract text from various image formats including JPG, PNG, JPEG, GIF, BMP, and WebP. Whether you need to digitize old documents, extract text from photos, or convert scanned files, our tool provides fast and reliable text extraction.",
    ],
  },
  {
    heading: "How to Convert Image to Text",
    listData: [
      "Upload your image by clicking 'Select or drag and drop your image here' or simply drag the image file into the upload area",
      "Wait for the image to load and appear in the preview section",
      "Click the 'Extract Text' button to start the OCR process",
      "Watch the progress bar as our advanced OCR engine processes your image",
      "Review the extracted text in the text editor on the right side",
      "Edit the text if needed, then copy, download, or share the results",
    ],
  },
  {
    heading: "Features of Our Image to Text Tool",
    listData: [
      "Free online OCR with no registration required",
      "Support for multiple image formats: JPG, PNG, JPEG, GIF, BMP, WebP",
      "Advanced text recognition technology for accurate results",
      "Real-time progress tracking during text extraction",
      "Edit extracted text directly in the built-in editor",
      "Copy extracted text to clipboard with one click",
      "Download extracted text as a .txt file",
      "Share results via shareable links",
      "Mobile-friendly responsive design",
    ],
  },
  {
    heading: "Supported Image Formats",
    blockData: [
      "Our image to text converter supports all major image formats to ensure maximum compatibility with your files:",
    ],
    listData: [
      "JPEG/JPG - Most common photo format, ideal for photographs and complex images",
      "PNG - Perfect for screenshots, graphics with transparency, and high-quality images",
      "GIF - Animated or static graphics, commonly used for web images",
      "BMP - Uncompressed bitmap images with high quality",
      "WebP - Modern web format that provides excellent compression and quality",
    ],
  },
  {
    heading: "Common Use Cases for Image to Text Conversion",
    listData: [
      "Digitizing old documents and handwritten notes",
      "Extracting text from screenshots for documentation",
      "Converting scanned PDFs and documents to editable text",
      "Transcribing text from photos taken with mobile devices",
      "Processing business cards and contact information",
      "Converting printed recipes, quotes, or articles from books",
      "Extracting text from memes, social media images, or infographics",
      "Digitizing historical documents and archives",
      "Converting foreign language signs or documents for translation",
      "Processing invoices, receipts, and financial documents",
    ],
  },
  {
    heading: "Tips for Better OCR Results",
    listData: [
      "Ensure your image has good lighting and contrast between text and background",
      "Use high-resolution images for better text recognition accuracy",
      "Keep the text orientation straight and avoid skewed or rotated images",
      "Crop unnecessary parts of the image to focus on the text area",
      "Avoid blurry or pixelated images that may affect recognition quality",
      "Use images with clear, readable fonts rather than decorative or cursive text",
      "Ensure the text size is not too small in the image",
      "Remove shadows or glare that might interfere with text detection",
    ],
  },
  {
    heading: "Privacy and Security",
    blockData: [
      "Your privacy is our top priority. All image processing happens directly in your browser using client-side OCR technology. This means your images and extracted text never leave your device or get uploaded to external servers.",
      "We don't store, save, or share any of your uploaded images or extracted text. Once you close the browser tab, all your data is permanently deleted from memory.",
    ],
  },
  {
    heading: "Benefits of Using Our Free OCR Tool",
    listData: [
      "Save time by quickly converting images to editable text instead of manual typing",
      "Improve productivity with instant text extraction from multiple sources",
      "Reduce errors that come with manual transcription",
      "Access your tool from any device with a web browser",
      "No software installation or account creation required",
      "Completely free with no hidden costs or limitations",
      "Regular updates and improvements to OCR accuracy",
      "Works offline once loaded in your browser",
    ],
  },
  {
    heading: "Frequently Asked Questions",
    listData: [
      "Q: Is the image to text converter really free? A: Yes, our OCR tool is completely free with no hidden charges or subscription fees.",
      "Q: What's the maximum file size supported? A: You can upload images up to 10MB in size for optimal processing speed.",
      "Q: How accurate is the text extraction? A: Our OCR technology provides high accuracy for clear, well-lit images with standard fonts.",
      "Q: Can I extract text from handwritten documents? A: Yes, though printed text generally provides better accuracy than handwriting.",
      "Q: Do you support languages other than English? A: Currently, our tool is optimized for English text recognition.",
      "Q: Can I use this tool on mobile devices? A: Absolutely! Our tool is fully responsive and works great on smartphones and tablets.",
    ],
  },
];
