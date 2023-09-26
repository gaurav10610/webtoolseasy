import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import {
  ApplicationIds,
  applicationConfig,
} from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/compound-interest-calculator';
const pageTitle =
  'Compound Interest Calculator: Calculate Your Future Earnings';
const pageDescription =
  'Calculate your future earnings with ease using our free online compound interest calculator. Simply enter your investment amount, interest rate, and investment term, and our calculator will show you how much your investment will grow over time.';
const imageUrl = `${environment.screenshotsBaseUrl}/compound-interest-calculator.png`;

const keywords =
  'compound interest calculator,calculate compound interest,compound interest,future earnings calculator,investment calculator,financial calculator,free compound interest calculator,no download required,easy to use,customizable settings,compounding frequency,reinvest earnings,financial goals,financial planning';

const relatedTools: ApplicationIds[] = [];

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Compound Interest Calculator: Calculate Your Future Earnings with Ease',
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
  relatedTools: relatedTools.map(tool => applicationConfig.get(tool)!),
  icons: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'What is Compound Interest?',
    blockData: [
      'Compound interest is interest that is earned on both the principal and the accumulated interest. This means that your earnings grow at an exponential rate over time.',
    ],
  },
  {
    heading: 'Why Use a Compound Interest Calculator?',
    listData: [
      'To calculate your future earnings. A compound interest calculator can help you to calculate how much your investment will grow over time. This can help you to make informed decisions about your finances.',
      `To set financial goals. Once you know how much your investment can grow over time, you can set financial goals for yourself. For example, you may want to save for retirement or for your child's education.`,
      'To track your progress. A compound interest calculator can help you to track the progress of your investments over time. This can help you to stay motivated and to make sure that you are on track to reach your financial goals.',
    ],
  },
  {
    heading: 'Features of Our Online Compound Interest Calculator',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Calculate compound interest directly from your web browser.',
      'Easy to use. Simply enter your investment amount, interest rate, and investment term, and our calculator will show you how much your investment will grow over time.',
      'Customizable settings. You can customize the settings of our calculator to match your personal preferences. For example, you can choose to calculate compound interest annually, semi-annually, quarterly, or monthly.',
    ],
  },
  {
    heading: 'How to Use Our Online Compound Interest Calculator',
    listData: [
      'Go to our website and enter your investment amount, interest rate, and investment term into the calculator.',
      'Select the compounding frequency from the dropdown menu.',
      'Click the "Calculate" button.',
      'View your future earnings in the sidebar.',
    ],
  },
  {
    heading: 'Tips for Using a Compound Interest Calculator',
    listData: [
      'Use realistic interest rates. When using a compound interest calculator, it is important to use realistic interest rates. You can find current interest rates for a variety of investments online or at your local bank.',
      'Consider the compounding frequency. The compounding frequency is the number of times per year that your interest is compounded. The more frequently your interest is compounded, the faster your investment will grow.',
      'Reinvest your earnings. If you reinvest your earnings, your investment will grow even faster. This is because you will be earning interest on both your principal and your accumulated interest.',
    ],
  },
  {
    blockData: [
      'Our free online compound interest calculator is a great way to calculate your future earnings with ease. It is easy to use and supports all compounding frequencies. With our calculator, you can easily calculate how much your investment will grow over time and set financial goals for yourself.',
    ],
  },
];
