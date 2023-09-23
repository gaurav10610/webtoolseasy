import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools/cron-expression';
const pageTitle = 'Online Cron Expression Generator: Create Cron Expressions';
const pageDescription =
  'Generate cron expressions for your tasks with ease with our free online cron expression generator tool. Graphically generate cron expressions online.';
const imageUrl = `${environment.screenshotsBaseUrl}/cron-expression.png`;

const keywords =
  'online cron expression generator,generate cron expression,cron expression generator tool,cron expression,crontab,cron job,schedule task,Unix-like operating system,free cron expression generator,no download required,supports all cron expression fields,easy to use,customizable settings';

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Free Online Cron Expression Generator: Easily Create Cron Expressions for Your Tasks',
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
    heading: 'What is a Cron Expression?',
    blockData: [
      `A cron expression is a string that represents a set of times at which a task will be executed. Cron expressions are used to schedule tasks on Unix-like operating systems.`,
    ],
  },
  {
    heading: 'Why Use a Cron Expression Generator?',
    listData: [
      'To save time and effort. Cron expression generators can save you a lot of time and effort by automatically generating cron expressions for you.',
      'To avoid errors. Cron expression generators can help you to avoid errors in your cron expressions.',
      'To learn more about cron expressions. Cron expression generators can help you to learn more about cron expressions by providing detailed information about each field in the expression.',
    ],
  },
  {
    heading: 'Features of Our Online Cron Expression Generator Tool',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Generate cron expressions directly from your web browser.',
      'Supports all cron expression fields. Our generator supports all cron expression fields, including second, minute, hour, day of month, month, and day of week.',
      'Easy to use. Simply select the desired execution times for your task and our generator will generate the corresponding cron expression.',
      'Customizable settings. You can customize the settings of our generator to match your personal preferences.',
    ],
  },
  {
    heading: 'How to Use Our Online Cron Expression Generator Tool',
    listData: [
      'Go to our website and select the desired execution times for your task.',
      'Click the "Generate Cron Expression" button.',
      'View your generated cron expression in the sidebar.',
      'Copy and paste your generated cron expression into your crontab file.',
    ],
  },
  {
    heading: 'Tips for Using a Cron Expression Generator',
    listData: [
      'Use a consistent cron expression format. There are multiple cron expression formats in use. Choose a format and use it consistently throughout your project. This will make it easier to read and understand your cron expressions.',
      'Test your cron expressions before using them in production. Once you have generated a cron expression, be sure to test it before using it in production. This will help you to identify and fix any problems with the expression.',
      'Use comments to document your cron expressions. Adding comments to your cron expressions can help you to understand and maintain your crontab file.',
    ],
  },
  {
    heading: 'Examples of Cron Expression',
    listData: [
      `* * * * * : Runs a job every minute, every hour, every day, every month, and every day of the week.`,
      `0 0 * * * : Runs a job at midnight (00:00) every day.`,
      `0 * * * * : Runs a job at the start of every hour.`,
      `*/15 * * * * : Runs a job every 15 minutes.`,
      `0 2 * * * : Runs a job at 2:00 AM every day.`,
      `0 0 * * 5 : Runs a job at midnight (00:00) every Friday.`,
      `0 0 1 * * : Runs a job at midnight (00:00) on the first day of every month.`,
      `0 0 * * 1 : Runs a job at midnight (00:00) every Monday.`,
      `0 0 * * 0 : Runs a job at midnight (00:00) every Sunday (0 or 7 can represent Sunday).`,
      `0 2 * * 1,3,5 : Runs a job at 2:00 AM every Monday, Wednesday, and Friday.`,
      `0 0 1,15 * * : Runs a job at midnight (00:00) on the 1st and 15th day of every month.`,
      `*/2 * * * * : Runs a job every 2 minutes.`,
      `0 */3 * * * : Runs a job every 3 hours.`,
      `15-30 * * * * : Runs a job every minute from the 15th to the 30th minute of each hour.`,
      `0 1,3,5 * * * : Runs a job at 1:00 AM, 3:00 AM, and 5:00 AM every day.`,
      `0 0 L * * : Runs a job at midnight (00:00) on the last day of every month.`,
      `0 0 * * 1-5 : Runs a job at midnight (00:00) from Monday to Friday (business days).`,
      `0 0 * * 6,7 : Runs a job at midnight (00:00) on Saturday and Sunday (weekends).`,
    ],
  },
  {
    blockData: [
      'Our free online cron expression generator tool is a great way to easily create cron expressions for your tasks. It is easy to use and supports all cron expression fields. With our generator, you can save time and effort, avoid errors, and learn more about cron expressions.',
    ],
  },
];
