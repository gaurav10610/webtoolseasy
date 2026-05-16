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
    description: "Matches a standard email address structure. It checks for a local part, an '@' symbol, a domain name, and a top-level domain of at least two characters.",
    testExamples: {
      passing: ["user@example.com", "first.last+tag@sub.domain.co.uk"],
      failing: ["userexample.com", "user@.com", "user@example."],
    },
    useCases: ["Form validation", "Data extraction from text", "Database constraints"],
  },
  {
    slug: "uuid",
    name: "UUID / GUID",
    pattern: "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
    flags: "i",
    description: "Matches a standard 36-character UUID or GUID, which consists of 32 hexadecimal digits separated by hyphens into five groups.",
    testExamples: {
      passing: ["123e4567-e89b-12d3-a456-426614174000", "550E8400-E29B-41D4-A716-446655440000"],
      failing: ["123e4567-e89b-12d3-a456", "123e4567-e89b-12d3-a456-42661417400Z"],
    },
    useCases: ["API input validation", "Log parsing", "Database IDs"],
  },
  {
    slug: "ipv4",
    name: "IPv4 Address",
    pattern: "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    flags: "",
    description: "Matches a valid IPv4 address. It ensures each of the four octets is between 0 and 255.",
    testExamples: {
      passing: ["192.168.1.1", "255.255.255.0", "0.0.0.0"],
      failing: ["256.1.1.1", "192.168.1", "192.168.1.1.1"],
    },
    useCases: ["Network configuration validation", "Log analysis", "Security rules"],
  },
  {
    slug: "mac-address",
    name: "MAC Address",
    pattern: "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
    flags: "",
    description: "Matches a standard MAC address, consisting of six groups of two hexadecimal digits, separated by hyphens or colons.",
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
    description: "Matches a 3-character or 6-character hexadecimal color code, with an optional leading '#' symbol.",
    testExamples: {
      passing: ["#FF0000", "#f00", "00FF00", "fff"],
      failing: ["#FF000", "#FF000Z", "F0"],
    },
    useCases: ["CSS parsers", "Design tool inputs", "Theme configuration files"],
  },
];
