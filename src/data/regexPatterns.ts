export type RegexPattern = {
  slug: string;
  name: string;
  pattern: string;
  flags: string;
  description: string;
  testExamples: {
    passing: string[];
    failing: string[];
  };
  useCases: string[];
};

export const regexPatterns: RegexPattern[] = [
  {
    slug: "email",
    name: "Email Address",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    flags: "",
    description:
      "Matches a standard email address structure. It checks for a local part, an '@' symbol, a domain name, and a top-level domain of at least two characters.",
    testExamples: {
      passing: ["user@example.com", "first.last+tag@sub.domain.co.uk"],
      failing: ["userexample.com", "user@.com", "user@example."],
    },
    useCases: [
      "Form validation",
      "Data extraction from text",
      "Database constraints",
    ],
  },
  {
    slug: "uuid",
    name: "UUID / GUID",
    pattern:
      "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
    flags: "i",
    description:
      "Matches a standard 36-character UUID or GUID, which consists of 32 hexadecimal digits separated by hyphens into five groups.",
    testExamples: {
      passing: [
        "123e4567-e89b-12d3-a456-426614174000",
        "550E8400-E29B-41D4-A716-446655440000",
      ],
      failing: [
        "123e4567-e89b-12d3-a456",
        "123e4567-e89b-12d3-a456-42661417400Z",
      ],
    },
    useCases: ["API input validation", "Log parsing", "Database IDs"],
  },
  {
    slug: "ipv4",
    name: "IPv4 Address",
    pattern:
      "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    flags: "",
    description:
      "Matches a valid IPv4 address. It ensures each of the four octets is between 0 and 255.",
    testExamples: {
      passing: ["192.168.1.1", "255.255.255.0", "0.0.0.0"],
      failing: ["256.1.1.1", "192.168.1", "192.168.1.1.1"],
    },
    useCases: [
      "Network configuration validation",
      "Log analysis",
      "Security rules",
    ],
  },
  {
    slug: "mac-address",
    name: "MAC Address",
    pattern: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
    flags: "",
    description:
      "Matches a standard MAC address, consisting of six groups of two hexadecimal digits, separated by hyphens or colons.",
    testExamples: {
      passing: ["00:1A:2B:3C:4D:5E", "00-1A-2B-3C-4D-5E"],
      failing: ["00:1A:2B:3C:4D", "00:1A:2B:3C:4D:5Z", "001A2B3C4D5E"],
    },
    useCases: ["Network access control lists", "Device inventory", "DHCP logs"],
  },
  {
    slug: "hex-color",
    name: "Hexadecimal Color",
    pattern: "^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$",
    flags: "",
    description:
      "Matches a 3-character or 6-character hexadecimal color code, with an optional leading '#' symbol.",
    testExamples: {
      passing: ["#FF0000", "#f00", "00FF00", "fff"],
      failing: ["#FF000", "#FF000Z", "F0"],
    },
    useCases: [
      "CSS parsers",
      "Design tool inputs",
      "Theme configuration files",
    ],
  },
  {
    slug: "url",
    name: "URL (HTTP/HTTPS)",
    pattern:
      "^https?:\\/\\/(?:www\\.)?[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+(?:\\/[\\w\\-./?%&=+#]*)?$",
    flags: "",
    description:
      "Matches common HTTP and HTTPS URLs with optional path and query components.",
    testExamples: {
      passing: ["https://example.com", "http://docs.example.io/path?q=1"],
      failing: ["ftp://example.com", "example.com/path"],
    },
    useCases: ["Form validation", "Crawler input sanitization", "Log parsing"],
  },
  {
    slug: "domain-name",
    name: "Domain Name",
    pattern:
      "^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(?:\\.(?!-)[A-Za-z0-9-]{1,63}(?<!-))+$$",
    flags: "",
    description:
      "Matches a domain name with one or more dot-separated labels and valid hyphen placement.",
    testExamples: {
      passing: ["example.com", "api.my-service.co.uk"],
      failing: ["-bad.example", "example"],
    },
    useCases: ["DNS validation", "Tenant domain checks", "Input linting"],
  },
  {
    slug: "slug",
    name: "URL Slug",
    pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    flags: "",
    description:
      "Matches lowercase URL-safe slugs using alphanumeric words separated by single hyphens.",
    testExamples: {
      passing: ["hello-world", "api-v2-docs"],
      failing: ["Hello-World", "bad_slug"],
    },
    useCases: ["CMS routing", "SEO URLs", "Static site generation"],
  },
  {
    slug: "semver",
    name: "Semantic Version",
    pattern:
      "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-([0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?(?:\\+([0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*))?$",
    flags: "",
    description:
      "Matches semantic version strings such as 1.2.3, including optional prerelease and build metadata.",
    testExamples: {
      passing: ["1.2.3", "2.0.0-beta.1+build.9"],
      failing: ["1.2", "v1.2.3"],
    },
    useCases: ["Release tooling", "Dependency validation", "CI checks"],
  },
  {
    slug: "date-iso",
    name: "ISO Date (YYYY-MM-DD)",
    pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
    flags: "",
    description:
      "Matches a date in ISO-like format YYYY-MM-DD with basic month/day range checks.",
    testExamples: {
      passing: ["2026-05-16", "1999-12-31"],
      failing: ["2026-5-16", "16-05-2026"],
    },
    useCases: [
      "Date field validation",
      "CSV cleaning",
      "API payload validation",
    ],
  },
  {
    slug: "time-24h",
    name: "24h Time (HH:mm)",
    pattern: "^([01]\\d|2[0-3]):[0-5]\\d$",
    flags: "",
    description: "Matches 24-hour clock time strings like 09:30 or 23:59.",
    testExamples: {
      passing: ["00:00", "23:59"],
      failing: ["24:00", "9:30"],
    },
    useCases: ["Scheduling forms", "Cron UI helpers", "Time normalization"],
  },
  {
    slug: "phone-e164",
    name: "Phone Number (E.164)",
    pattern: "^\\+[1-9]\\d{1,14}$",
    flags: "",
    description:
      "Matches international E.164 phone format such as +14155552671.",
    testExamples: {
      passing: ["+14155552671", "+919876543210"],
      failing: ["4155552671", "+01"],
    },
    useCases: ["SMS signup validation", "CRM normalization", "Identity flows"],
  },
  {
    slug: "postal-us-zip",
    name: "US ZIP Code",
    pattern: "^\\d{5}(?:-\\d{4})?$",
    flags: "",
    description: "Matches US ZIP code in 5-digit or ZIP+4 format.",
    testExamples: {
      passing: ["94105", "10001-1234"],
      failing: ["9410", "94105 1234"],
    },
    useCases: ["Address forms", "Shipping tools", "Regional analytics"],
  },
  {
    slug: "html-tag",
    name: "HTML Tag",
    pattern: "<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)<\\/\\1>",
    flags: "gis",
    description:
      "Matches simple paired HTML tags with their content (best for lightweight parsing tasks).",
    testExamples: {
      passing: ["<p>Hello</p>", "<div class='x'>A</div>"],
      failing: ["<img src='x' />", "<p>Hello</div>"],
    },
    useCases: ["Content cleanup", "Snippet extraction", "Migration scripts"],
  },
  {
    slug: "credit-card-basic",
    name: "Credit Card Number (Basic)",
    pattern: "^(?:\\d[ -]*?){13,19}$",
    flags: "",
    description:
      "Matches 13-19 digit payment card-like strings (format check only, no Luhn validation).",
    testExamples: {
      passing: ["4242 4242 4242 4242", "5555-5555-5555-4444"],
      failing: ["4242", "abcd-efgh-ijkl-mnop"],
    },
    useCases: ["Input sanitization", "Data masking pipelines", "QA fixtures"],
  },
  {
    slug: "strong-password",
    name: "Strong Password",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{12,}$",
    flags: "",
    description:
      "Matches passwords with at least 12 characters, including uppercase, lowercase, numeric, and special characters.",
    testExamples: {
      passing: ["My$trongPassw0rd", "A1!veryLongPassword"],
      failing: ["password123", "Short1!"],
    },
    useCases: ["Signup validation", "Security policy checks", "Admin portals"],
  },
  {
    slug: "linux-file-path",
    name: "Linux File Path",
    pattern: "^(\\/(?:[^\\0\\/]+\\/?)+)$",
    flags: "",
    description: "Matches absolute Linux-like file paths without null bytes.",
    testExamples: {
      passing: ["/var/log/nginx/access.log", "/usr/local/bin"],
      failing: ["var/log/nginx", "C:\\Windows\\Temp"],
    },
    useCases: ["CLI input checks", "Log processing", "Config validation"],
  },
  {
    slug: "windows-file-path",
    name: "Windows File Path",
    pattern:
      '^[A-Za-z]:\\\\(?:[^\\\\/:*?"<>|\\r\\n]+\\\\)*[^\\\\/:*?"<>|\\r\\n]*$',
    flags: "",
    description:
      "Matches typical absolute Windows file paths with drive letter prefix.",
    testExamples: {
      passing: ["C:\\Program Files\\App\\app.exe", "D:\\Data\\notes.txt"],
      failing: ["/usr/local/bin", "C:folder\\file.txt"],
    },
    useCases: ["Desktop tools", "Installer validation", "Path sanitization"],
  },
  {
    slug: "html-hex-entity",
    name: "HTML Hex Entity",
    pattern: "^&#x[0-9A-Fa-f]+;$",
    flags: "",
    description:
      "Matches HTML hexadecimal character entities such as &#x1F600;.",
    testExamples: {
      passing: ["&#x20AC;", "&#x1F600;"],
      failing: ["&x20AC;", "&#20AC;"],
    },
    useCases: [
      "Text rendering tools",
      "Encoding validation",
      "Entity decoding",
    ],
  },
  {
    slug: "markdown-heading",
    name: "Markdown Heading",
    pattern: "^(#{1,6})\\s+(.+)$",
    flags: "m",
    description: "Matches ATX-style Markdown headings from level 1 to level 6.",
    testExamples: {
      passing: ["# Title", "### Subsection"],
      failing: ["Title", "####### Too many hashes"],
    },
    useCases: ["Markdown linting", "Docs parsing", "Content extraction"],
  },
  {
    slug: "github-username",
    name: "GitHub Username",
    pattern: "^(?!-)[a-zA-Z0-9-]{1,39}(?<!-)$",
    flags: "",
    description:
      "Matches GitHub-style usernames with 1-39 chars and no leading/trailing hyphen.",
    testExamples: {
      passing: ["gaurav10610", "octo-cat"],
      failing: ["-octocat", "name_with_underscore"],
    },
    useCases: ["Profile imports", "OAuth checks", "Community tools"],
  },
  {
    slug: "git-commit-sha",
    name: "Git Commit SHA",
    pattern: "^[0-9a-f]{7,40}$",
    flags: "i",
    description: "Matches short and full git commit hashes.",
    testExamples: {
      passing: ["a1b2c3d", "e3f1e3fd5d8b7e0d9f53a01f91fce6c4d9f48f1b"],
      failing: ["xyz1234", "a1b2c3"],
    },
    useCases: ["Release tooling", "CI metadata", "Changelog parsing"],
  },
  {
    slug: "docker-image-tag",
    name: "Docker Image Reference",
    pattern:
      "^(?:[a-z0-9]+(?:[._-][a-z0-9]+)*(?:\\/[a-z0-9]+(?:[._-][a-z0-9]+)*)*)(?::[\\w][\\w.-]{0,127})?$",
    flags: "",
    description: "Matches common Docker image references with optional tags.",
    testExamples: {
      passing: ["nginx:1.27", "ghcr.io/org/app:main"],
      failing: ["Nginx:latest", "app:"],
    },
    useCases: ["DevOps validation", "Deployment pipelines", "CI config checks"],
  },
  {
    slug: "aws-arn",
    name: "AWS ARN",
    pattern: "^arn:(aws|aws-cn|aws-us-gov):[a-z0-9-]+:[a-z0-9-]*:\\d{12}:.+$",
    flags: "",
    description:
      "Matches AWS ARN strings with partition, service, region, account, and resource.",
    testExamples: {
      passing: [
        "arn:aws:s3:::my-bucket",
        "arn:aws:lambda:us-east-1:123456789012:function:my-fn",
      ],
      failing: ["arn:s3:::my-bucket", "aws:lambda:us-east-1:123:function:x"],
    },
    useCases: ["IAM policy tooling", "Infra linting", "Cloud automation"],
  },
  {
    slug: "kubernetes-name",
    name: "Kubernetes Resource Name",
    pattern: "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$",
    flags: "",
    description:
      "Matches DNS-1123 label format used by many Kubernetes resource names.",
    testExamples: {
      passing: ["web-api", "redis"],
      failing: ["Web-API", "-badname"],
    },
    useCases: [
      "Helm chart validation",
      "K8s YAML linting",
      "Resource generators",
    ],
  },
];
