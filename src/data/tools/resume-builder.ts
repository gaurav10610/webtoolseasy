import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/resume-builder";
const pageTitle =
  "Private Resume Builder - Create Professional Resume Offline | No Signup";
const pageDescription =
  "Build professional resume 100% client-side with complete privacy. No data upload, no signup required. Work offline, customize templates, and download PDF instantly. Your data never leaves your device.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/resume-builder.png`;

const keywords =
  "resume builder,private resume builder,offline resume maker,cv builder,no signup resume,client-side resume,secure cv maker,privacy resume builder,free resume template,professional resume generator";

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
  mainHeading: "Resume Builder: Create Professional Resume Free Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.INVOICE_GENERATOR,
    ApplicationIds.SIGNATURE_GENERATOR,
    ApplicationIds.PDF_EDITOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "resume-builder",
    pageTitle,
    mainHeading: "Resume Builder: Create Professional Resume Free Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Resume Builder?",
    blockData: [
      "A resume builder is an online tool that helps create professional resumes quickly and easily. Our free resume builder provides customizable templates, allowing you to input your information and generate a polished, ATS-friendly resume in minutes. Download as PDF ready for job applications.",
    ],
  },
  {
    heading: "Why Use Our Resume Builder?",
    listData: [
      "Multiple professional templates - Choose from modern, classic, and creative designs",
      "ATS-friendly formatting - Optimized for Applicant Tracking Systems",
      "Real-time preview - See changes instantly as you type",
      "PDF export - Download high-quality PDF for job applications",
      "No signup required - Start building immediately",
      "Mobile responsive - Create resumes on any device",
      "Completely free - No hidden costs or watermarks",
    ],
  },
  {
    heading: "How to Create a Resume?",
    listData: [
      "Choose a professional template that matches your industry",
      "Fill in your personal information and contact details",
      "Add work experience with job titles and achievements",
      "List your education, skills, and certifications",
      "Preview your resume and make adjustments",
      "Download as PDF and use for job applications",
    ],
  },
  {
    heading: "Resume Writing Tips",
    listData: [
      "Use action verbs to describe achievements",
      "Quantify results with numbers and percentages",
      "Keep it concise - ideally one to two pages",
      "Tailor your resume for each job application",
      "Use clear, professional fonts and formatting",
      "Include relevant keywords from job descriptions",
      "Proofread carefully for spelling and grammar errors",
    ],
  },
  {
    heading: "Common Resume Sections",
    listData: [
      "Contact Information - Name, phone, email, LinkedIn",
      "Professional Summary - Brief overview of qualifications",
      "Work Experience - Job history with achievements",
      "Education - Degrees, certifications, and training",
      "Skills - Technical and soft skills relevant to the role",
      "Optional: Projects, Awards, Publications, Languages",
    ],
  },
];
