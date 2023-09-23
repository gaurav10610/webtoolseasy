import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools/qr-code-generator';
const pageTitle = 'Free QR Code Generator: Generate QR Code | QR Code Builder';
const pageDescription =
  'Generate custom QR codes for free with our easy-to-use online QR code generator tool. No download required, no sign-up required.';
const imageUrl = `${environment.screenshotsBaseUrl}/cron-expression.png`;

const keywords =
  'online qr code generator,qr code generator,qr code,create qr code,qr code types,free qr code generator,no download required,easy to use,customizable settings,qr code tips,qr code best practices,generate qr,qr code builder,quick response code';

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Free Online QR Code Generator: Generate QR Codes in Seconds',
  navigationUrl,
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
  tags: keywords.split(',').map(word => word.trim()),
  icons: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'What is a QR Code?',
    blockData: [
      'A QR code (Quick Response code) is a two-dimensional barcode that can be scanned with a smartphone or tablet camera. QR codes can be used to store a variety of information, such as website URLs, contact information, text messages, and even Wi-Fi passwords.',
    ],
  },
  {
    heading: 'Why Use a QR Code Generator?',
    listData: [
      'To create QR codes for your website or business. QR codes can be used to make it easier for people to visit your website or learn more about your business. You can place QR codes on your business cards, flyers, and other marketing materials.',
      'To create QR codes for your social media profiles. QR codes can be used to make it easier for people to follow you on social media. You can place QR codes on your website and in your email signature.',
      'To create QR codes for events and promotions. QR codes can be used to provide people with more information about upcoming events or promotions. You can place QR codes on posters, flyers, and tickets.',
    ],
  },
  {
    heading: 'Features of Our Online QR Code Generator Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Generate QR codes directly from your web browser.',
      'Supports all QR code types. Our generator supports all QR code types, including standard QR codes, URL QR codes, vCard QR codes, and more.',
      'Easy to use. Simply enter the information you want to encode in the QR text-box and the qr code will be generated automatically.',
      'Multiple download option, you may either save qr as SVG or download qr in PNG, JPEG, WEBP as an image',
    ],
  },
  {
    heading: 'How to Use Our Online QR Code Generator Tool',
    listData: [
      'Go to our website and enter the information you want to encode in the QR code.',
      'Enter the QR text in the text-box and the qr code will be generated automatically.',
      'View your generated QR code in the sidebar.',
      'Download your QR code in multiple supported formats i.e SVG, JPEG, PNG and WEBP.',
    ],
  },
  {
    heading: 'Tips for Using a QR Code Generator',
    listData: [
      'Use a high-quality QR code generator. Not all QR code generators are created equal. Some generators may produce QR codes that are difficult to scan or that do not work properly. Make sure to use a high-quality QR code generator to ensure that your QR codes are scannable and reliable.',
      'Test your QR codes before using them. Once you have generated a QR code, be sure to test it before using it. Scan the QR code with your smartphone or tablet camera to make sure that it works properly.',
      'Place your QR codes in strategic locations. When placing your QR codes, make sure to place them in locations where they are likely to be seen and scanned. For example, you could place QR codes on your business cards, flyers, and marketing materials. You could also place QR codes on your website and in your email signature.',
    ],
  },
  {
    blockData: [
      'Our free online QR code generator tool is a great way to create custom QR codes in seconds. It is easy to use and supports all QR code types. With our generator, you can easily create QR codes for your website, business, social media profiles, events, and promotions.',
    ],
  },
];
