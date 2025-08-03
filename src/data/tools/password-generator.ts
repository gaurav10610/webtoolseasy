import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/password-generator";
const pageTitle = "Password Generator - Create Strong Secure Passwords";
const pageDescription =
  "Generate strong, secure passwords instantly. Free password generator with customizable length, characters, and bulk generation. Enhance your security now.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/password-generator.png`;

const keywords =
  "password generator,strong password generator,secure passwords,random password generator,password creator,bulk password generator,password maker";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
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
  mainHeading:
    "Free Online Password Generator: Create Strong, Secure & Random Passwords",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.JWT_DECODER],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Why Use a Password Generator?",
    listData: [
      "To create strong passwords. A strong password is at least 12 characters long and contains a mix of upper and lowercase letters, numbers, and symbols. It should not be a word that can be found in a dictionary or a personal detail such as your name or birthday.",
      "To use different passwords for all your accounts. If you use the same password for multiple accounts and one of those accounts is hacked, your other accounts are also at risk. Using a password generator can help you create and manage unique passwords for all your accounts.",
      "To make it easier to remember your passwords. A password generator can create strong, random passwords that are difficult to guess but easy for you to remember.",
    ],
  },
  {
    heading: "Features of Our Strong Password Generator",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Generate passwords directly from your web browser.",
      "Creates strong, unique passwords. Our password generator uses advanced algorithms to create passwords that are difficult to guess.",
      'Easy to use. Simply click the "Generate Password" button and your password will be generated.',
      "Generate single password or generate passwords in bulk.",
      "Save your passwords in a password manager. We recommend saving your passwords in a password manager to keep them safe and secure.",
    ],
  },
  {
    heading: "How to Use Our Strong Password Generator",
    listData: [
      'Go to our website and click the "Generate Password" button.',
      "Choose the desired length of your password.",
      "Select the types of characters you want to include in your password.",
      'Click the "Generate Password" button again to generate a new password.',
      "Save your password in a password manager.",
    ],
  },
  {
    heading: "Tips for Creating Strong Passwords",
    listData: [
      "Use at least 12 characters. The longer your password, the more difficult it is to crack.",
      "Use a mix of upper and lowercase letters, numbers, and symbols. This makes your password more difficult to guess.",
      "Avoid using words that can be found in a dictionary or personal details such as your name or birthday. These passwords are easy to guess.",
      "Use a different password for each of your online accounts. This way, if one of your accounts is hacked, your other accounts are still safe.",
    ],
  },
  {
    blockData: [
      "Our strong password generator is a great way to create strong, unique passwords for all your online accounts. It is easy to use and free to use. With our password generator, you can keep your accounts safe and secure from hackers.",
    ],
  },
  {
    heading: "Disclaimer",
    blockData: [
      `Generated passwords are provided as is without any kind of warranty.`,
    ],
  },
  {
    heading: "References",
    links: [
      {
        displayText: "Read more about Password Strength at Wikipedia",
        url: "https://en.wikipedia.org/wiki/Password_strength",
      },
      {
        displayText: "Randomness Requirements for Security (RFC 4086)",
        url: "https://www.rfc-editor.org/info/rfc4086",
      },
      {
        displayText: `Preparation, Enforcement, and Comparison of Internationalized Strings Representing Usernames and Passwords (RFC 8265)`,
        url: "https://www.rfc-editor.org/rfc/rfc8265",
      },
    ],
  },
];
