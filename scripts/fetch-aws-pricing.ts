import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

type ServiceKey = "EC2" | "RDS" | "S3" | "Lambda" | "CloudFront" | "ALB";

type PricingServiceRates = {
  EC2?: Record<string, number>;
  RDS?: Record<string, number>;
  S3?: {
    storagePerGBMonth?: number;
    readReqPerMillion?: number;
    writeReqPerMillion?: number;
  };
  Lambda?: {
    requestPerMillion?: number;
    gbSecond?: number;
  };
  CloudFront?: {
    freeTierGb?: number;
    overagePerGB?: number;
  };
  ALB?: {
    hourly?: number;
    lcuHourly?: number;
  };
};

type PricingFile = {
  meta: {
    version: string;
    source: string;
    updatedAt: string;
  };
  regions: Record<string, PricingServiceRates>;
};

const OUTPUT_FILE = resolve(
  process.cwd(),
  "src/data/awsPricing.generated.json",
);
const DEFAULT_REGION = "us-east-1";

const AWS_OFFER_CODES: Record<ServiceKey, string> = {
  EC2: "AmazonEC2",
  RDS: "AmazonRDS",
  S3: "AmazonS3",
  Lambda: "AWSLambda",
  CloudFront: "AmazonCloudFront",
  ALB: "ElasticLoadBalancing",
};

function pickFirstNumber(...values: Array<unknown>): number | null {
  for (const value of values) {
    const parsed = typeof value === "number" ? value : Number(value);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) return parsed;
  }
  return null;
}

async function fetchJson(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "webtoolseasy-pricing-sync",
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

function createBaseline(): PricingFile {
  return {
    meta: {
      version: "baseline-2026-05-15",
      source: "embedded-manual-baseline",
      updatedAt: new Date().toISOString(),
    },
    regions: {
      "us-east-1": {
        EC2: {
          "t3.nano": 0.0052,
          "t3.micro": 0.0104,
          "t3.small": 0.0208,
          "t3.medium": 0.0416,
          "t3.large": 0.0832,
          "m5.large": 0.096,
          "c5.large": 0.085,
        },
        RDS: {
          "db.t3.micro": 0.017,
          "db.t3.small": 0.034,
          "db.t3.medium": 0.068,
          "db.m5.large": 0.171,
        },
        S3: {
          storagePerGBMonth: 0.023,
          readReqPerMillion: 0.4,
          writeReqPerMillion: 5,
        },
        Lambda: {
          requestPerMillion: 0.2,
          gbSecond: 0.0000166667,
        },
        CloudFront: {
          freeTierGb: 1000,
          overagePerGB: 0.085,
        },
        ALB: {
          hourly: 0.0225,
          lcuHourly: 0.008,
        },
      },
    },
  };
}

function extractOnDemandRate(
  offer: any,
  predicate: (attributes: Record<string, string>) => boolean,
): Record<string, number> {
  const rates: Record<string, number> = {};

  for (const product of Object.values<any>(offer.products ?? {})) {
    const attributes = product.attributes ?? {};
    if (!predicate(attributes)) continue;

    const termSku = offer.terms?.OnDemand?.[product.sku];
    if (!termSku) continue;

    const priceDimensions = Object.values<any>(termSku.priceDimensions ?? {});
    const firstDimension = priceDimensions[0];
    if (!firstDimension) continue;

    const key =
      attributes.instanceType ||
      attributes.usageType ||
      attributes.group ||
      attributes.operation;
    const price = pickFirstNumber(
      firstDimension.pricePerUnit?.USD,
      firstDimension.pricePerUnit?.usd,
    );
    if (key && price !== null) {
      rates[key] = price;
    }
  }

  return rates;
}

async function fetchServicePricing(
  service: ServiceKey,
): Promise<PricingServiceRates | null> {
  const offerCode = AWS_OFFER_CODES[service];
  const offerIndex = await fetchJson(
    "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json",
  );
  const offerPath = offerIndex?.offers?.[offerCode]?.currentVersionUrl;
  if (!offerPath) {
    return null;
  }

  const offer = await fetchJson(
    `https://pricing.us-east-1.amazonaws.com${offerPath}`,
  );

  if (service === "EC2") {
    return {
      EC2: extractOnDemandRate(offer, (attributes) => {
        const region = String(attributes.location ?? "").toLowerCase();
        return (
          region.includes(DEFAULT_REGION) ||
          region.includes("us east (n. virginia)")
        );
      }),
    };
  }

  if (service === "RDS") {
    return {
      RDS: extractOnDemandRate(offer, (attributes) =>
        String(attributes.location ?? "")
          .toLowerCase()
          .includes("us east"),
      ),
    };
  }

  if (service === "S3") {
    return {
      S3: {
        storagePerGBMonth: 0.023,
        readReqPerMillion: 0.4,
        writeReqPerMillion: 5,
      },
    };
  }

  if (service === "Lambda") {
    return {
      Lambda: {
        requestPerMillion: 0.2,
        gbSecond: 0.0000166667,
      },
    };
  }

  if (service === "CloudFront") {
    return {
      CloudFront: {
        freeTierGb: 1000,
        overagePerGB: 0.085,
      },
    };
  }

  if (service === "ALB") {
    return {
      ALB: {
        hourly: 0.0225,
        lcuHourly: 0.008,
      },
    };
  }

  return null;
}

async function main() {
  try {
    const baseline = createBaseline();
    const serviceEntries = await Promise.all(
      (Object.keys(AWS_OFFER_CODES) as ServiceKey[]).map(
        async (service) =>
          [service, await fetchServicePricing(service)] as const,
      ),
    );

    const nextFile: PricingFile = {
      ...baseline,
      meta: {
        ...baseline.meta,
        source: "aws-pricing-api",
        updatedAt: new Date().toISOString(),
      },
      regions: {
        ...baseline.regions,
        "us-east-1": {
          ...baseline.regions["us-east-1"],
          ...Object.fromEntries(
            serviceEntries.flatMap(([service, pricing]) =>
              pricing ? [[service, pricing[service]]] : [],
            ),
          ),
        },
      },
    };

    await writeFile(
      OUTPUT_FILE,
      `${JSON.stringify(nextFile, null, 2)}\n`,
      "utf8",
    );
    // eslint-disable-next-line no-console
    console.log(`Wrote ${OUTPUT_FILE}`);
  } catch (error) {
    const baseline = createBaseline();
    await writeFile(
      OUTPUT_FILE,
      `${JSON.stringify(baseline, null, 2)}\n`,
      "utf8",
    );
    // eslint-disable-next-line no-console
    console.warn("AWS pricing fetch failed; wrote baseline pricing instead.");
    // eslint-disable-next-line no-console
    console.warn(error);
    process.exitCode = 1;
  }
}

main();
