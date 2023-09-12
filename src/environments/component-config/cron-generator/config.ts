import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';

const navigationUrl = '/tools/cron-expression';
const pageTitle = 'Cron Expression Generator | Cron Expression Builder';
const pageDescription =
  'Cron expression generator tool lets you graphically generate cron expression online. Generate quartz cron expression. Generate spring cron expression.';
const imageUrl = `${environment.screenshotsBaseUrl}/cron-expression.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Cron Expression Generator',
  subHeading: 'Graphically Generate Cron Expression Online',
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
  tags: [
    'cron expression',
    'cron expression generator',
    'cron generator',
    'cron online',
    'cron expression builder',
  ],
  icons: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'What is a Cron Job?',
    blockData: [
      `A cron job is a scheduled task or job in Unix-like operating systems that is used to automate repetitive tasks at specific intervals or times. The term "cron" is derived from the Greek word "chronos," which means time. Cron jobs are named after the utility that manages them, called "cron."`,
    ],
  },
  {
    heading: 'How Cron Job works?',
    listData: [
      `Cron Schedule: You define a schedule for when you want a particular command or script to run. This schedule is specified using a combination of time and date fields. These fields determine when the job should execute, such as minute, hour, day of the month, month, and day of the week.`,
      `Command or Script: You specify the command or script that you want to run on that schedule. This can be any shell command, script, or program that the operating system can execute.`,
      `Cron Daemon: A daemon (a background process) called the "cron daemon" or simply "cron" continuously checks the cron schedule and, when a scheduled time matches the current time, it executes the specified command or script automatically.`,
    ],
  },
  {
    heading: 'What is a Cron Expression?',
    listData: [
      `A cron expression is a string representing a schedule for recurring tasks or jobs in Unix-like operating systems. It is used to define the timing and frequency of when a specific task, command, or script should be executed by the cron daemon. Cron expressions consist of fields that specify minute, hour, day of the month, month, and day of the week, allowing for highly customizable scheduling.`,
      `Cron expression can be of two formats i.e Quartz cron expression or Standard Linux cron expression.`,
    ],
  },
  {
    heading: 'What is a Quartz Cron Expression?',
    listData: [
      `Environment: Quartz is a job scheduling library and framework primarily used in Java applications. It provides a programmatic way to schedule and manage jobs within Java applications.`,
      `Syntax: Quartz uses a more expressive and flexible syntax for defining job schedules. Quartz expressions can specify not only the timing of jobs but also more complex schedules, such as "run every weekday except holidays" or "run every 15 minutes between 9 AM and 5 PM."`,
      `Resolution: Quartz can schedule jobs with second-level precision, making it suitable for applications that require very fine-grained control over job timing.`,
      `Usage: Quartz is used within Java applications and provides programmatic scheduling capabilities. Developers embed Quartz code within their applications to schedule and manage tasks.`,
      `Complex Scheduling: Quartz supports complex scheduling scenarios, such as chaining jobs, creating dependencies between jobs, and handling misfires (e.g., jobs that were missed due to system downtime).`,
      `Portability: Quartz is specific to Java applications and is not inherently portable to other programming languages or environments.`,
    ],
  },
  {
    heading: 'What is a Standard Linux Cron Expression?',
    listData: [
      `Environment: Linux cron expressions are used in Unix-like operating systems (including Linux) to schedule tasks at the system level. They are typically used to schedule system maintenance and automation tasks.`,
      `Syntax: Linux cron expressions have a simpler syntax limited to specifying minute, hour, day of the month, month, and day of the week. While powerful for many tasks, they are less expressive when compared to Quartz.`,
      `Resolution: Linux cron expressions typically have minute-level precision. Some cron daemons may support sub-minute scheduling, but this is less common and not as precise as Quartz.`,
      `Usage: Linux cron expressions are used at the system level and are configured using the crontab command or system-level configuration files. They are suitable for scheduling system-related tasks and scripts.`,
      `Complex Scheduling: While Linux cron expressions can handle basic scheduling needs, they are less capable of handling complex scheduling requirements without additional scripting or external tools.`,
      `Portability: Linux cron expressions are more portable across Unix-like operating systems and can be used with various scripting languages like Bash, Python, or Perl.`,
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
    heading: 'Key features',
    listData: [
      `Supports quartz cron expression.`,
      `User-Friendly Interface: Online cron expression generator provides a intuitive and easy to navigate, making it accessible to users with varying levels of technical expertise.`,
      `Interactive Scheduler: Online cron expression generator provides a visual representation of the cron schedule, such as a calendar or timeline, can help users understand and visualize when their task will run.`,
      `Field Customization: Users can customize each field of the cron expression (minute, hour, day of the month, month, and day of the week) using dropdowns, sliders, or input fields.`,
      `Copy and Paste: Users can easily copy the generated cron expression for use in their applications or scripts.`,
      `Cross-Platform Compatibility: Online cron expression generator works well across different web browsers and operating systems.`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about Cron at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Cron',
      },
      {
        displayText: 'Read more about Quartz scheduler at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Quartz_(scheduler)',
      },
    ],
  },
];
