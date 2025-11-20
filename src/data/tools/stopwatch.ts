import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/stopwatch";
const pageTitle = "Stopwatch Online - Free Digital Stopwatch with Lap Timer";
const pageDescription =
  "Use our free online stopwatch with lap times. Accurate digital timer for sports, workouts, cooking, studying. Track splits and measure time precisely.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/stopwatch.png`;

const keywords =
  "stopwatch online,digital stopwatch,lap timer,online timer,split timer,free stopwatch,precise timer,interval timer";

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
  mainHeading: "Free Online Stopwatch: Precise Digital Timer with Lap Times",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.COUNTDOWN_TIMER,
    ApplicationIds.TIME_DURATION_CALCULATOR,
    ApplicationIds.DATE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "stopwatch",
    pageTitle,
    mainHeading: "Free Online Stopwatch: Precise Digital Timer with Lap Times",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Accurate Online Stopwatch for Every Need",
    blockData: [
      "Our free online stopwatch provides precise time measurement for any activity. Whether you're timing workouts, tracking cooking times, measuring study sessions, or recording race splits, this digital stopwatch delivers accuracy down to milliseconds. The clean, easy-to-read display works perfectly on any device.",
      "With lap time functionality, you can track multiple intervals without stopping the main timer. Perfect for athletes tracking workout splits, teachers timing student activities, or anyone needing to measure multiple events within a single timing session. All lap times are saved and displayed for easy reference.",
    ],
  },
  {
    heading: "How to Use the Stopwatch",
    listData: [
      "Click Start to begin timing",
      "Click Lap to record split times",
      "Click Stop to pause the timer",
      "View all recorded lap times below",
      "Click Reset to clear and start over",
      "Works in background - even if you switch tabs",
    ],
  },
  {
    heading: "Stopwatch Features",
    listData: [
      "Precise timing to milliseconds",
      "Unlimited lap time recording",
      "Clean, large display easy to read",
      "Start, stop, and reset controls",
      "Lap times with timestamps",
      "Works on desktop, tablet, and mobile",
      "No installation or download required",
      "Continues timing in background",
      "Keyboard shortcuts for quick control",
      "100% free with no ads or interruptions",
    ],
  },
  {
    heading: "Common Uses for Online Stopwatch",
    listData: [
      "Sports and athletics: Track race times and training intervals",
      "Fitness workouts: Time exercise sets and rest periods",
      "Cooking: Measure precise cooking and baking times",
      "Studying: Track study sessions and break intervals",
      "Productivity: Measure task completion times",
      "Gaming: Speedrun timing and challenge completion",
      "Teaching: Time classroom activities and tests",
      "Speaking: Practice presentation timing",
    ],
  },
  {
    heading: "Why Use an Online Stopwatch?",
    blockData: [
      "Unlike physical stopwatches that require batteries and can be lost or forgotten, an online stopwatch is always accessible from any device with internet. Your browser provides the timing mechanism, ensuring accuracy comparable to dedicated hardware without the hassle of carrying extra equipment.",
      "The lap time feature transforms a simple timer into a powerful tracking tool. Athletes can analyze their performance across multiple intervals, fitness enthusiasts can record circuit training rounds, and students can track study session segments. All data is displayed clearly, making it easy to review and compare times.",
    ],
  },
  {
    heading: "Tips for Accurate Timing",
    blockData: [
      "For best results, keep the stopwatch tab active or in the foreground during timing. While modern browsers continue background timing, having the tab visible ensures you can quickly record lap times when needed.",
      "When recording lap times for athletic events, practice hitting the lap button before you actually need it. The slight delay in human reaction time means you should anticipate when to press, especially for fast-moving events like sprinting or swimming.",
      "For cooking or tasks requiring exact timing, set a backup alarm or timer for critical moments. While our stopwatch is precise, having a reminder ensures you don't miss important timing checkpoints while focusing on other tasks.",
    ],
  },
  {
    heading: "Stopwatch vs Timer: When to Use Each",
    blockData: [
      "Use a stopwatch when you need to measure how long something takes – tracking duration from start to finish. Examples include workout sessions, race times, cooking preparation, or study periods. Stopwatches count up from zero, perfect for tracking elapsed time.",
      "Use a countdown timer when you need to be alerted after a specific duration – setting a fixed time limit. Examples include baking times, meditation sessions, pomodoro work intervals, or exam time limits. Timers count down to zero and alert you when time is up.",
    ],
  },
];
