import { gunzipSync } from "fflate";

type GeoRange = {
  starts: Uint32Array;
  ends: Uint32Array;
  countries: string[];
};

type GeoLookup = {
  countryCode: string;
  region: string | null;
  city: string | null;
} | null;

let geoRangePromise: Promise<GeoRange> | null = null;

function ipv4ToNumber(address: string): number | null {
  const parts = address.split(".").map((part) => Number(part));
  if (
    parts.length !== 4 ||
    parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)
  ) {
    return null;
  }
  return (
    (((parts[0] << 24) >>> 0) +
      ((parts[1] << 16) >>> 0) +
      ((parts[2] << 8) >>> 0) +
      (parts[3] >>> 0)) >>>
    0
  );
}

async function loadGeoRanges(): Promise<GeoRange> {
  if (!geoRangePromise) {
    geoRangePromise = (async () => {
      const response = await fetch("/data/ip-geo-ipv4-country.csv.gz");
      if (!response.ok) {
        throw new Error("Failed to load IP geolocation data");
      }

      const compressedBytes = new Uint8Array(await response.arrayBuffer());
      const csvBytes = gunzipSync(compressedBytes);
      const csv = new TextDecoder().decode(csvBytes);
      const lines = csv.split("\n").filter(Boolean);

      const starts = new Uint32Array(lines.length);
      const ends = new Uint32Array(lines.length);
      const countries: string[] = new Array(lines.length);

      for (let index = 0; index < lines.length; index += 1) {
        const [start, end, country] = lines[index].split(",");
        starts[index] = Number(start) >>> 0;
        ends[index] = Number(end) >>> 0;
        countries[index] = (country || "").trim();
      }

      return { starts, ends, countries };
    })();
  }

  return geoRangePromise;
}

export async function lookupIpv4Geo(address: string): Promise<GeoLookup> {
  const value = ipv4ToNumber(address);
  if (value === null) return null;

  const geo = await loadGeoRanges();
  let low = 0;
  let high = geo.starts.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const start = geo.starts[mid];
    const end = geo.ends[mid];

    if (value < start) {
      high = mid - 1;
      continue;
    }

    if (value > end) {
      low = mid + 1;
      continue;
    }

    return {
      countryCode: geo.countries[mid],
      region: null,
      city: null,
    };
  }

  return null;
}
