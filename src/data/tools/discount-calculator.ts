import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";

export const discountCalculatorMetadata = {
  pageTitle: "Discount Calculator - Calculate Sale Price & Savings",
  mainHeading: "Discount Calculator",
  tags: [
    "discount calculator",
    "sale price calculator",
    "percentage off calculator",
    "savings calculator",
    "price reduction",
    "discount percentage",
    "final price calculator",
    "shopping calculator",
    "sale calculator",
    "markdown calculator",
    "clearance calculator",
  ],
  relatedTools: [
    ApplicationIds.PERCENTAGE_CALCULATOR,
    ApplicationIds.CURRENCY_CONVERTER,
    ApplicationIds.TIP_CALCULATOR,
  ],
};

export const discountCalculatorDescriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Discount Calculator?",
    blockData: [
      "A discount calculator is a practical tool that helps you quickly determine the final price of an item after applying a discount. It calculates the amount saved, the discount percentage, and the final sale price. This tool is essential for shoppers comparing deals, retailers planning promotions, and anyone wanting to understand the true value of discounts during sales events.",
    ],
  },
  {
    heading: "Why Use a Discount Calculator?",
    blockData: [
      "Discount calculators eliminate mental math errors when shopping and help you make informed purchasing decisions. They're especially useful during major sales events like Black Friday, holiday promotions, or clearance sales. By instantly seeing the final price and savings amount, you can quickly compare deals across different stores, calculate bulk purchase savings, and determine if a discount meets your budget requirements.",
    ],
  },
  {
    heading: "Common Discount Scenarios",
    blockData: [
      "Discount calculators are used in various shopping contexts: retail sales with percentage-off promotions, clearance events with multiple markdowns, buy-one-get-one-half-off deals, loyalty program discounts, seasonal sales, coupon applications, bulk purchase discounts, and employee discount calculations. They're also useful for business owners planning pricing strategies and promotional campaigns to maximize revenue while remaining competitive.",
    ],
  },
  {
    heading: "How to Calculate Discounts",
    blockData: [
      "To calculate a discount, you need two pieces of information: the original price and either the discount percentage or the final price. The calculator uses the formula: Discount Amount = Original Price × (Discount Percentage ÷ 100). The final price is then: Final Price = Original Price - Discount Amount. For reverse calculations, you can find the discount percentage by: Percentage = ((Original Price - Final Price) ÷ Original Price) × 100.",
    ],
  },
  {
    heading: "Understanding Multiple Discounts",
    blockData: [
      "When multiple discounts are applied (like a 20% sale plus an additional 10% coupon), they're typically applied sequentially, not added together. For example, a 20% discount followed by 10% off is not 30% total - it's 28%. The calculator handles these stacked discounts correctly by applying each percentage to the reduced price from the previous discount. Always check store policies on how multiple discounts combine.",
    ],
  },
  {
    heading: "Shopping Tips with Discounts",
    blockData: [
      "Smart shoppers use discount calculators to compare actual savings across stores, even when discount percentages differ. A 40% discount on a $100 item gives the same final price as 50% off an $80 item ($60). Consider price-per-unit for bulk discounts, factor in shipping costs that might offset savings, compare sale prices to competitor regular prices, and check if waiting for better discounts makes sense based on purchase urgency.",
    ],
  },
  {
    heading: "Business Applications",
    blockData: [
      "Retailers use discount calculators for pricing strategy, ensuring profitability while offering competitive discounts. They help determine optimal discount percentages for clearance items, plan seasonal promotions, calculate bulk pricing tiers, and set loyalty program benefits. Businesses can model different discount scenarios to find the sweet spot between attracting customers and maintaining healthy profit margins.",
    ],
  },
  {
    heading: "Discount Calculator Features",
    blockData: [
      "Modern discount calculators offer multiple calculation modes: calculate final price from discount percentage, find discount percentage from original and final prices, determine how much to save for a target final price, and calculate the original price from the final discounted price. Advanced features include tax calculations, multiple discount stacking, currency conversion for international shopping, and the ability to compare multiple discount scenarios side by side.",
    ],
  },
];
