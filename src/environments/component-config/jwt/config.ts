import { ApplicationConfig } from 'src/app/@types/config';
import { DescriptionBlock } from 'src/app/@types/description';
import { environment } from 'src/environments/environment';
import { AppDisplayNames } from 'src/environments/tools-directory-config';

const navigationUrl = '/tools/jwt';
const pageTitle = 'JWT Decoder';
const pageDescription =
  'JSON Web Token (JWT) Decode. JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is digitally signed using JSON Web Signature (JWS).';
const imageUrl = `${environment.screenshotsBaseUrl}/jwt-decoder.png`;

export const componentConfig: ApplicationConfig = {
  mainHeading: 'JWT Decoder',
  subHeading: 'JSON Web Token (JWT) Decode',
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
  ],
  tags: [
    'jwt decode',
    'jwt token decode',
    'decode jwt',
    'jwt decode online',
    'RFC 7519',
  ],
  icons: [
    {
      iconName: 'app-icon',
      iconRelativeUrl: 'app-icon.svg',
    },
    {
      iconName: 'linkedin-icon',
      iconRelativeUrl: 'linkedin-icon.svg',
    },
    {
      iconName: 'facebook-icon',
      iconRelativeUrl: 'facebook.svg',
    },
    {
      iconName: 'uuid-icon',
      iconRelativeUrl: 'uuid-icon.svg',
    },
    {
      iconName: 'share-fb',
      iconRelativeUrl: 'share-fb.svg',
    },
    {
      iconName: 'share-linkedin',
      iconRelativeUrl: 'share-linkedin.svg',
    },
    {
      iconName: 'share-twitter',
      iconRelativeUrl: 'share-twitter.svg',
    },
    {
      iconName: 'share-copy',
      iconRelativeUrl: 'share-copy.svg',
    },
  ],
  relatedTools: [
    {
      applicationId: 'uuid',
      displayText: AppDisplayNames.UUID_GENERATOR,
      iconName: 'uuid-icon',
      navigateUrl: '/tools/uuid',
    },
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: 'What is JSON Web Token (JWT)?',
    blockData: [
      `JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. It is typically used for authentication and authorization purposes, as an alternative to session-based authentication.`,
      `In a JWT, the information is encoded as a JSON object and then signed using a digital signature, so that the receiver can verify that the information has not been tampered with. The information in a JWT can be read by anyone, but only the party that holds the secret key can sign a JWT, making it secure for transmitting sensitive information.`,
      `JWTs are often used in conjunction with OAuth 2.0, an open standard for authorization, and are often used to pass authentication information between an authentication server and a resource server, or between different systems. They are also used as a secure way to transmit information in Single Sign-On (SSO) systems.`,
      `Overall, JWTs provide a lightweight and convenient way to transmit information securely over the web, making them an increasingly popular choice for many application development scenarios.`,
    ],
  },
  {
    heading: 'What is the need of JWT decoder?',
    blockData: [
      `A JWT decoder tool allows you to decode, verify, and inspect the contents of a JWT. This is essential for developers and security professionals who need to troubleshoot, test, or inspect the contents of a JWT for security or compliance purposes.`,
      `With an online JWT decoder tool, you can quickly and easily decode and inspect the contents of a JWT, including the header, payload, and signature. This information can be used to verify the authenticity of the JWT, to identify any potential security vulnerabilities, or to ensure compliance with security standards.`,
    ],
  },
  {
    heading: 'Key features',
    listData: [
      `Supports wide range of JWT alogirithms i.e HS256, HS384, HS512, PS256, PS384, PS512, RS256, RS384, RS512, ES256, ES256K, ES384, ES512 & EdDSA`,
      `Secure: JSON Web Token (JWT) is being decoded in host browser only.`,
    ],
  },
  {
    heading: 'Disclaimer',
    blockData: [
      `JWTs are credentials, which can grant access to resources. Be careful where you paste them! We do not record tokens.`,
    ],
  },
  {
    heading: 'References',
    links: [
      {
        displayText: 'Read more about JSON Web Token (JWT) at Wikipedia',
        url: 'https://en.wikipedia.org/wiki/JSON_Web_Token',
      },
      {
        displayText: 'RFC 7519',
        url: 'https://www.ietf.org/rfc/rfc7519.txt',
      },
    ],
  },
];
