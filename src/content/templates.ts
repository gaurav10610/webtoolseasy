export type TemplateField = {
  name: string;
  type: string;
  description: string;
};

export type ApiTemplate = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  fields: TemplateField[];
  endpoint: string;
};

export const templates: ApiTemplate[] = [
  {
    slug: "ecommerce-products",
    title: "E-commerce Products",
    seoTitle: "Free Mock E-commerce Products API | WebToolsEasy",
    seoDescription: "Generate realistic mock e-commerce product JSON data instantly. Perfect for testing storefronts, carts, and product galleries.",
    description: "Realistic products with prices, SKUs, and images.",
    endpoint: "/api/mock/ecommerce-products",
    fields: [
      { name: "id", type: "string (UUID)", description: "Unique product identifier" },
      { name: "name", type: "string", description: "Product name (e.g. Ergonomic Concrete Chair)" },
      { name: "price", type: "number", description: "Price between 10.00 and 1000.00" },
      { name: "description", type: "string", description: "Short product description" },
      { name: "image", type: "string (URL)", description: "Placeholder image URL" },
      { name: "stock", type: "number", description: "Available inventory quantity" }
    ]
  },
  {
    slug: "user-profiles",
    title: "User Profiles",
    seoTitle: "Free Mock User Profiles API | WebToolsEasy",
    seoDescription: "Generate random user profiles in JSON format. Includes names, avatars, emails, and UUIDs for frontend development.",
    description: "Avatars, emails, names, and UUIDs.",
    endpoint: "/api/mock/user-profiles",
    fields: [
      { name: "id", type: "string (UUID)", description: "Unique user identifier" },
      { name: "firstName", type: "string", description: "User's first name" },
      { name: "lastName", type: "string", description: "User's last name" },
      { name: "email", type: "string", description: "Valid email address format" },
      { name: "avatar", type: "string (URL)", description: "Profile picture URL" },
      { name: "createdAt", type: "string (ISO 8601)", description: "Account creation timestamp" }
    ]
  },
  {
    slug: "blog-posts",
    title: "Blog Posts",
    seoTitle: "Free Mock Blog Posts API | WebToolsEasy",
    seoDescription: "Free REST API returning realistic mock blog posts. Includes titles, author info, publication dates, and paragraphs.",
    description: "Titles, Markdown bodies, authors, and timestamps.",
    endpoint: "/api/mock/blog-posts",
    fields: [
      { name: "id", type: "string (UUID)", description: "Unique post identifier" },
      { name: "title", type: "string", description: "Catchy blog post title" },
      { name: "slug", type: "string", description: "URL-friendly slug" },
      { name: "content", type: "string", description: "Multiple paragraphs of text" },
      { name: "authorId", type: "string (UUID)", description: "Reference to user profile" },
      { name: "publishedAt", type: "string (ISO 8601)", description: "Publication date" }
    ]
  },
  {
    slug: "real-estate",
    title: "Real Estate Listings",
    seoTitle: "Free Mock Real Estate API | WebToolsEasy",
    seoDescription: "Generate random real estate property listings in JSON format. Includes prices, addresses, bedrooms, and property types.",
    description: "Addresses, prices, bedrooms, and property types.",
    endpoint: "/api/mock/real-estate",
    fields: [
      { name: "id", type: "string (UUID)", description: "Unique property identifier" },
      { name: "address", type: "string", description: "Full street address" },
      { name: "price", type: "number", description: "Property price in USD" },
      { name: "bedrooms", type: "number", description: "Number of bedrooms (1-6)" },
      { name: "bathrooms", type: "number", description: "Number of bathrooms (1-4)" },
      { name: "propertyType", type: "string", description: "House, Apartment, Condo, etc." }
    ]
  }
];

export function getTemplateBySlug(slug: string): ApiTemplate | undefined {
  return templates.find(t => t.slug === slug);
}
