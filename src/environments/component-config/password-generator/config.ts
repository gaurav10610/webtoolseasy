import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/password-generator';
const pageTitle =
  'Password Generator: Create Strong, Random & Secure Passwords';
const pageDescription =
  'Generate strong, unique passwords for all your online accounts with our free password generator tool. No sign-up required. Generate single password or generate passwords in bulk.';
const imageUrl = `${environment.screenshotsBaseUrl}/password-generator.png`;

const keywords =
  'password generator,strong password generator,create secure passwords,unique passwords,different passwords for all accounts,easy to remember passwords,easy to use password generator,free password generator,no sign-up required,advanced algorithms,password manager,generate password,choose password length,select password characters,save password,tips for creating strong passwords,at least 12 characters,mix of upper and lowercase letters, numbers, and symbols,avoid using words from a dictionary or personal details,different password for each account';

export const componentConfig: ApplicationConfig = {
  mainHeading:
    'Strong Password Generator: Create Secure Passwords for All Your Accounts',
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
  icons: [
    {
      iconName: 'jwt-icon',
      iconRelativeUrl: 'jwt-icon.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'jwt',
      displayText: AppDisplayNames.JWT_DECODER,
      iconName: 'jwt-icon',
      navigateUrl: '/tools/jwt',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'Why Use a Password Generator?',
    listData: [
      'To create strong passwords. A strong password is at least 12 characters long and contains a mix of upper and lowercase letters, numbers, and symbols. It should not be a word that can be found in a dictionary or a personal detail such as your name or birthday.',
      'To use different passwords for all your accounts. If you use the same password for multiple accounts and one of those accounts is hacked, your other accounts are also at risk. Using a password generator can help you create and manage unique passwords for all your accounts.',
      'To make it easier to remember your passwords. A password generator can create strong, random passwords that are difficult to guess but easy for you to remember.',
    ],
  },
  {
    heading: 'Features of Our Strong Password Generator',
    listData: [
      'Free to use. No need to pay or sign up for an account.',
      'No download required. Generate passwords directly from your web browser.',
      'Creates strong, unique passwords. Our password generator uses advanced algorithms to create passwords that are difficult to guess.',
      'Easy to use. Simply click the "Generate Password" button and your password will be generated.',
      'Save your passwords in a password manager. We recommend saving your passwords in a password manager to keep them safe and secure.',
    ],
  },
  {
    heading: 'How to Use Our Strong Password Generator',
    listData: [
      'Go to our website and click the "Generate Password" button.',
      'Choose the desired length of your password.',
      'Select the types of characters you want to include in your password.',
      'Click the "Generate Password" button again to generate a new password.',
      'Save your password in a password manager.',
    ],
  },
  {
    heading: 'Tips for Creating Strong Passwords',
    listData: [
      'Use at least 12 characters. The longer your password, the more difficult it is to crack.',
      'Use a mix of upper and lowercase letters, numbers, and symbols. This makes your password more difficult to guess.',
      'Avoid using words that can be found in a dictionary or personal details such as your name or birthday. These passwords are easy to guess.',
      'Use a different password for each of your online accounts. This way, if one of your accounts is hacked, your other accounts are still safe.',
    ],
  },
  {
    blockData: [
      'Our strong password generator is a great way to create strong, unique passwords for all your online accounts. It is easy to use and free to use. With our password generator, you can keep your accounts safe and secure from hackers.',
    ],
  },
  {
    heading: 'Disclaimer',
    blockData: [
      `Generated passwords are provided as is without any kind of warranty.`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about Password Strength at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Password_strength',
      },
      {
        displayText: 'Randomness Requirements for Security (RFC 4086)',
        url: 'https://www.rfc-editor.org/info/rfc4086',
      },
      {
        displayText: `Preparation, Enforcement, and Comparison of Internationalized Strings Representing Usernames and Passwords (RFC 8265)`,
        url: 'https://www.rfc-editor.org/rfc/rfc8265',
      },
    ],
  },
];
