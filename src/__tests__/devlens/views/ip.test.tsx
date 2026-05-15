import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { IpView } from "@/components/devlens/views/IpView";

describe("IpView", () => {
  it("renders IPv4 class and CIDR breakdown", () => {
    const html = renderToStaticMarkup(<IpView input="172.16.5.10/24" />);

    expect(html).toContain("Class B");
    expect(html).toContain("private");
    expect(html).toContain("Network");
    expect(html).toContain("172.16.5.0");
    expect(html).toContain("Broadcast");
    expect(html).toContain("172.16.5.255");
    expect(html).toContain("Host count");
    expect(html).toContain("254");
  });

  it("renders IPv6 expansion and compression", () => {
    const html = renderToStaticMarkup(<IpView input="fe80::1" />);

    expect(html).toContain("IPv6");
    expect(html).toContain("link-local");
    expect(html).toContain("fe80:0000:0000:0000:0000:0000:0000:0001");
    expect(html).toContain("fe80::1");
  });

  it("shows an invalid state for malformed input", () => {
    const html = renderToStaticMarkup(<IpView input="not-an-ip" />);

    expect(html).toContain("Unable to parse input");
    expect(html).toContain("Invalid IPv4 or IPv6 address");
  });
});
