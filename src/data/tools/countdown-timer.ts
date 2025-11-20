import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/countdown-timer";
const pageTitle = "Countdown Timer - Free Online Timer with Alarm";
const pageDescription =
  "Set custom countdown timer online for free. Alarm notifications, presets for cooking, workouts, meditation. Perfect time management tool for productivity.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/countdown-timer.png`;

const keywords =
  "countdown timer,online timer,timer with alarm,countdown clock,interval timer,pomodoro timer,cooking timer,workout timer";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com"
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favion_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
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
  mainHeading: "Free Countdown Timer: Set Custom Alarms & Reminders Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.STOPWATCH,
    ApplicationIds.TIME_DURATION_CALCULATOR,
    ApplicationIds.TIMEZONE_CONVERTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "countdown-timer",
    pageTitle,
    mainHeading: "Free Countdown Timer: Set Custom Alarms & Reminders Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Online Countdown Timer with Alarm",
    blockData: [
      "Our free online countdown timer helps you manage time effectively with customizable alarms and visual notifications. Perfect for cooking, workouts, meditation, studying, or any activity requiring precise time tracking. Set your desired duration and let our timer alert you when time's up.",
      "Choose from quick preset timers or create custom countdowns for any duration. The timer continues running even when you switch tabs or minimize your browser, ensuring you never miss an important deadline. When time expires, you'll receive both visual and audio notifications.",
    ],
  },
  {
    heading: "How to Use the Countdown Timer",
    listData: [
      "Select a preset time or enter custom hours, minutes, and seconds",
      "Click Start to begin the countdown",
      "Timer displays remaining time in large, easy-to-read format",
      "Pause anytime and resume when ready",
      "Receive alarm notification when countdown completes",
      "Reset and set a new timer as needed",
    ],
  },
  {
    heading: "Countdown Timer Features",
    listData: [
      "Customizable time duration (hours, minutes, seconds)",
      "Quick presets: 5, 10, 15, 25, 30 minutes, 1 hour",
      "Audio alarm when timer expires",
      "Visual notification and flashing display",
      "Pause and resume functionality",
      "Full-screen mode for better visibility",
      "Works in background tabs",
      "No installation required",
      "Mobile and desktop friendly",
      "100% free with no registration",
    ],
  },
  {
    heading: "Popular Timer Presets",
    listData: [
      "Pomodoro (25 minutes): Focus work sessions",
      "5 minutes: Quick breaks or tea brewing",
      "10 minutes: Short meditation or exercise intervals",
      "15 minutes: Power naps or task sprints",
      "30 minutes: Cooking, baking, or longer workouts",
      "45 minutes: Class periods or presentation practice",
      "1 hour: Extended study sessions or meetings",
      "Custom: Any duration for your specific needs",
    ],
  },
  {
    heading: "Best Uses for Countdown Timers",
    blockData: [
      "Countdown timers excel at productivity techniques like the Pomodoro method, where you work in focused 25-minute intervals followed by short breaks. The timer keeps you accountable and helps prevent burnout by enforcing regular rest periods. Many people find they accomplish more in timed sprints than in marathon work sessions.",
      "In the kitchen, countdown timers are essential for precise cooking and baking. Whether you're boiling eggs for exactly 7 minutes or letting bread dough rise for 90 minutes, a reliable timer ensures perfect results. The audio alarm means you can leave the kitchen without worrying about overcooking.",
      "Fitness enthusiasts use countdown timers for interval training, like HIIT workouts where you alternate between intense exercise and rest periods. Set the timer for your work interval, and when it beeps, switch to rest mode. This structured approach maximizes workout efficiency and helps maintain proper form by preventing fatigue.",
    ],
  },
  {
    heading: "Time Management Tips",
    blockData: [
      "Break large tasks into smaller, timed segments. Instead of working on a project for 'a few hours,' set specific 25 or 45-minute timers. This creates urgency, improves focus, and makes daunting tasks feel more manageable. You'll be surprised how much you accomplish in short, dedicated time blocks.",
      "Use timers to enforce breaks and prevent burnout. Set a countdown for 50 minutes of work followed by a mandatory 10-minute break. During breaks, step away from your screen, stretch, hydrate, or take a short walk. Regular breaks actually improve productivity and creativity.",
      "Combine timers with task batching for maximum efficiency. Set a timer and commit to completing similar tasks during that period – responding to all emails, making all phone calls, or reviewing all documents. This minimizes context switching and helps you enter a flow state.",
    ],
  },
  {
    heading: "Countdown Timer vs Stopwatch",
    blockData: [
      "Use a countdown timer when you need to work within a specific time limit or be alerted after a set duration. Examples include cooking (bake for 30 minutes), workouts (exercise for 45 seconds), studying (focus for 25 minutes), or meetings (end in 1 hour). Countdown timers count down from your set time to zero and alert you when complete.",
      "Use a stopwatch when you need to measure how long something takes without a predetermined end time. Examples include running laps (how fast can you run?), project tracking (how long did this task take?), or cooking preparation (how much time did chopping vegetables require?). Stopwatches count up from zero.",
    ],
  },
];
