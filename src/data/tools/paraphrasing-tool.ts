import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/paraphrasing-tool";
const pageTitle = "Free Paraphrasing Tool - Rewrite Text Online";
const keywords =
  "paraphrasing tool, paraphrase generator, rewrite text, text rewriter, rephrase tool, sentence rephraser, article rewriter, paraphrase online";

export const componentConfig: ApplicationConfig = {
  mainHeading: "Paraphrasing Tool - Rewrite Text Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.TEXT_SUMMARIZER,
    ApplicationIds.WORD_COUNTER,
    ApplicationIds.TEXT_COMPARE,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "paraphrasing-tool",
    pageTitle,
    mainHeading: "Paraphrasing Tool - Rewrite Text Instantly",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Free Online Paraphrasing Tool",
    blockData: [
      "Paraphrase and rewrite text instantly with our free online tool. Perfect for students, writers, and content creators who need to rephrase sentences while preserving meaning. Choose from multiple paraphrasing modes for different writing styles.",
    ],
  },
  {
    heading: "How to Use the Paraphrasing Tool",
    blockData: [
      "Paste or type your text into the input area. Select a paraphrasing mode: Standard (balanced rewriting), Formal (academic style), Creative (extensive rewording), or Fluency (improve flow). Click 'Paraphrase Text' to generate your rewritten content. Review and copy the paraphrased text.",
    ],
  },
  {
    heading: "Paraphrasing Modes",
    blockData: [
      "• Standard Mode: Balanced synonym replacement with moderate restructuring",
      "• Formal Mode: Academic and professional tone with sophisticated vocabulary",
      "• Creative Mode: Extensive rewording with varied sentence structures",
      "• Fluency Mode: Enhanced readability and natural flow",
    ],
  },
  {
    heading: "Key Features",
    blockData: [
      "• Multiple paraphrasing modes",
      "• Preserve original meaning",
      "• Synonym-based replacement",
      "• Sentence restructuring",
      "• Real-time processing",
      "• Side-by-side comparison",
      "• Word count display",
      "• Copy to clipboard",
      "• 100% client-side processing",
    ],
  },
  {
    heading: "Perfect For",
    blockData: [
      "Students avoiding plagiarism in essays and assignments, writers exploring different phrasings, content creators repurposing content, bloggers refreshing old articles, researchers paraphrasing quotes, and professionals improving document clarity.",
    ],
  },
  {
    heading: "Privacy & Security",
    blockData: [
      "All text paraphrasing happens locally in your browser. Your content is never uploaded to any server, ensuring complete privacy and confidentiality of your work.",
    ],
  },
];
