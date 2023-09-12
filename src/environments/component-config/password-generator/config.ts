import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/password-generator';
const pageTitle =
  'Password Generator | Create Random Password | Passkey Generator';
const pageDescription =
  'Password generator tool lets you create/generate strong, random and secure password online. Generate single password or generate passwords in bulk.';
const imageUrl = `${environment.screenshotsBaseUrl}/password-generator.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'Online Password Generator',
  subHeading: 'Generate Strong, Random & Secure Passwords',
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
    'password generator',
    'pwd generator',
    'passkey generator',
    'bulk password generator',
    'secure password generator',
    'create random password',
    'strong password generator',
  ],
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
    heading: 'What makes a password strong?',
    listData: [
      `Length: The longer the password, the harder it is to crack. Ideally, your password should be at least 12 characters long.`,
      `Complexity: A strong password should contain a mix of upper and lowercase letters, numbers, and special characters such as punctuation marks.`,
      `Unpredictability: Your password should not be easy to guess based on information that could be publicly available about you, such as your name, birthdate, or hometown.`,
      `Randomness: A truly strong password should be randomly generated, rather than a word or phrase that is easy to guess.`,
      `Unique: You should use a different password for each of your accounts to avoid the risk of one password being compromised and then used to access your other accounts.`,
    ],
  },
  {
    heading: 'What makes a password weak?',
    listData: [
      `Short length: Passwords that are too short, typically less than eight characters, are easier to guess or crack.`,
      `Lack of complexity: Simple passwords that consist of only lowercase letters or only numbers, such as "password123," are easier to guess or crack than passwords that include a mix of uppercase and lowercase letters, numbers, and symbols.`,
      `Dictionary words: Passwords that are common words or phrases found in a dictionary are vulnerable to dictionary attacks, where attackers use automated tools to try every word in the dictionary.`,
      `Personal information: Passwords that contain personal information such as names, birthdates, or addresses are easy to guess or find through social engineering techniques.`,
      `Sequential or repetitive characters: Passwords that consist of sequential or repetitive characters, such as "12345678" or "aaaaaaa," are easy to guess or crack.`,
      `Overused passwords: Passwords that have been used repeatedly across multiple accounts are vulnerable to credential stuffing attacks, where attackers use stolen username and password combinations from one site to attempt to gain access to other sites.`,
      `Lack of updates: Passwords that have not been updated for a long time may be compromised in a data breach, and the compromised password may be used to gain unauthorized access to the account.`,
    ],
  },
  {
    heading: 'Key Features',
    listData: [
      `Generate unlimited strong and random passwords for free.`,
      `Complexity: Our password generator tool is capable of generating passwords that include a combination of uppercase and lowercase letters, numbers, and symbols. This combination makes the password much harder to guess or crack.`,
      `Customization: Our password generator tool allow users to customize the password generated, such as selecting which characters to include or exclude, or adding custom patterns or phrases.`,
      `Generate passwords in bulk using bulk password generator tool and export generated passwords in a text file.`,
      `User-friendly: Our password generator tool is easy to use and accessible to all types of users, regardless of their technical expertise.`,
      `Compatibility: Our password generator tool work on all types of devices and across all types of web browsers.`,
      `Security: We don't store any password. All the passwords are generated in host browser only.`,
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
