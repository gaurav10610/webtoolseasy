import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

type Props = {
  params: Promise<{ slug: string }>;
};

// --- ROBUST IN-MEMORY RATE LIMITER (Token Bucket Algorithm) ---
interface RateLimitData {
  tokens: number;
  lastRefill: number;
}

const rateLimitMap = new Map<string, RateLimitData>();
const MAX_TOKENS = 60; // Maximum bursts of 60 requests
const REFILL_RATE_MS = 1000; // Refill 1 token per second (max 60/min)

// Memory leak prevention: Clean up old IPs every 2 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now - data.lastRefill > 120000) { // 2 minutes inactivity
        rateLimitMap.delete(ip);
      }
    }
  }, 120000);
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let data = rateLimitMap.get(ip);
  
  if (!data) {
    data = { tokens: MAX_TOKENS, lastRefill: now };
    rateLimitMap.set(ip, data);
  }

  // Refill tokens based on time elapsed
  const timePassed = now - data.lastRefill;
  const tokensToAdd = Math.floor(timePassed / REFILL_RATE_MS);
  
  if (tokensToAdd > 0) {
    data.tokens = Math.min(MAX_TOKENS, data.tokens + tokensToAdd);
    // Keep remainder precision by not just setting to now
    data.lastRefill = now - (timePassed % REFILL_RATE_MS);
  }

  if (data.tokens > 0) {
    data.tokens -= 1;
    return { allowed: true, remaining: data.tokens };
  }
  
  return { allowed: false, remaining: 0 };
}
// ----------------------------------------------------------------

export const dynamic = "force-dynamic"; // Ensure random data on every request

export async function GET(request: Request, { params }: Props) {
  // 1. DdoS Protection: Apply Rate Limit
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown-ip";
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too Many Requests", message: "You have exceeded the rate limit of 60 requests per minute." },
      { 
        status: 429, 
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Retry-After": "1",
          "X-RateLimit-Limit": MAX_TOKENS.toString(),
          "X-RateLimit-Remaining": "0"
        }
      }
    );
  }

  const { slug } = await params;
  const url = new URL(request.url);
  const countParam = url.searchParams.get("count");
  // Default to 10 items, max 100 to prevent abuse
  const count = Math.min(Math.max(parseInt(countParam || "10", 10), 1), 100);

  const data = Array.from({ length: count }).map(() => {
    switch (slug) {
      case "ecommerce-products":
        return {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
          description: faker.commerce.productDescription(),
          image: faker.image.urlLoremFlickr({ category: "product" }),
          stock: faker.number.int({ min: 0, max: 500 }),
        };
      
      case "user-profiles":
        return {
          id: faker.string.uuid(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
          createdAt: faker.date.past().toISOString(),
        };

      case "blog-posts":
        return {
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          slug: faker.lorem.slug(),
          content: faker.lorem.paragraphs(3),
          authorId: faker.string.uuid(),
          publishedAt: faker.date.recent().toISOString(),
        };

      case "real-estate":
        return {
          id: faker.string.uuid(),
          address: faker.location.streetAddress(),
          price: faker.number.int({ min: 150000, max: 2000000 }),
          bedrooms: faker.number.int({ min: 1, max: 6 }),
          bathrooms: faker.number.int({ min: 1, max: 4 }),
          propertyType: faker.helpers.arrayElement(["House", "Apartment", "Condo", "Townhouse"]),
        };

      default:
        return null;
    }
  });

  if (!data[0]) {
    return NextResponse.json({ error: "API Mock template not found" }, { status: 404 });
  }

  // Set permissive CORS headers for testing
  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Cache-Control": "no-store, max-age=0",
      "X-RateLimit-Limit": MAX_TOKENS.toString(),
      "X-RateLimit-Remaining": remaining.toString()
    },
  });
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
