import { describe, expect, it } from "vitest";
import { detect } from "@/lib/devlens/detector";

describe("devlens detector", () => {
  it("detects JWTs", () => {
    expect(
      detect(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.signature",
      ).type,
    ).toBe("jwt");
  });

  it("detects JSON", () => {
    expect(detect('{"name":"webtoolseasy","count":2}').type).toBe("json");
  });

  it("detects base64 data urls and base64 text", () => {
    expect(
      detect("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB").type,
    ).toBe("base64-data-url");
    expect(detect("SGVsbG8gd29ybGQh").type).toBe("base64");
  });

  it("detects url encoded values", () => {
    expect(detect("hello%20world%21").type).toBe("url");
  });

  it("detects timestamps and uuids", () => {
    expect(detect("1715779200").type).toBe("timestamp");
    expect(detect("550e8400-e29b-41d4-a716-446655440000").type).toBe("uuid");
  });

  it("detects ip addresses and hex colors", () => {
    expect(detect("203.0.113.10").type).toBe("ip");
    expect(detect("#1e90ff").type).toBe("hex-color");
  });

  it("detects regex, yaml, xml, csv, env, cron, sql, and pem", () => {
    expect(detect("/foo\d+/gi").type).toBe("regex");
    expect(detect("name: webtoolseasy\nmode: private").type).toBe("yaml");
    expect(detect('<?xml version="1.0"?><root><item /></root>').type).toBe(
      "xml",
    );
    expect(detect("name,age\nGaurav,33").type).toBe("csv");
    expect(detect("API_KEY=secret\nPORT=3000").type).toBe("env");
    expect(detect("0 9 * * 1").type).toBe("cron");
    expect(detect("SELECT * FROM users WHERE id = 1").type).toBe("sql");
    expect(detect("-----BEGIN CERTIFICATE-----\nMIIB").type).toBe(
      "pem-certificate",
    );
    expect(detect("-----BEGIN PRIVATE KEY-----\nMIIE").type).toBe(
      "pem-private-key",
    );
  });

  it("falls back to unknown for plain text", () => {
    expect(detect("just a note").type).toBe("unknown");
  });
});
