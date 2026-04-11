import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface IpLookupResponse {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  timezone?: string;
}

function normalizeIp(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const ip = value.split(",")[0]?.trim();

  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    return undefined;
  }

  return ip;
}

async function fetchWithTimeout<T>(url: string) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "WebToolsEasy/1.0",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });

  if (!response.ok) {
    throw new Error(`IP lookup failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function GET() {
  const headerStore = await headers();
  const requestIp =
    normalizeIp(headerStore.get("x-forwarded-for")) ||
    normalizeIp(headerStore.get("x-real-ip"));

  try {
    const data = await fetchWithTimeout<{
      ip?: string;
      city?: string;
      region?: string;
      country_name?: string;
      latitude?: number;
      longitude?: number;
      org?: string;
      timezone?: string;
    }>("https://ipapi.co/json/");

    return NextResponse.json<IpLookupResponse>({
      ip: data.ip || requestIp || "Unavailable",
      city: data.city,
      region: data.region,
      country: data.country_name,
      loc:
        data.latitude && data.longitude
          ? `${data.latitude}, ${data.longitude}`
          : undefined,
      org: data.org,
      timezone: data.timezone,
    });
  } catch {
    try {
      const data = await fetchWithTimeout<{
        ip?: string;
        country?: string;
        connection?: { isp?: string };
        timezone?: { id?: string };
      }>("https://ipwho.is/");

      return NextResponse.json<IpLookupResponse>({
        ip: data.ip || requestIp || "Unavailable",
        country: data.country,
        org: data.connection?.isp,
        timezone: data.timezone?.id,
      });
    } catch {
      return NextResponse.json<IpLookupResponse>({
        ip: requestIp || "Unavailable",
        org: requestIp
          ? "Basic request-level IP detection only. Detailed lookup is temporarily unavailable."
          : "Detailed IP lookup is temporarily unavailable in this environment.",
      });
    }
  }
}
