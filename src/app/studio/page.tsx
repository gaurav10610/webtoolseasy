import { Metadata } from "next";
import { Studio } from "@/components/devlens/Studio";

export const metadata: Metadata = {
  title: "DevLens Studio | WebToolsEasy",
  description:
    "Smart Paste workbench for JWT, JSON, Base64, timestamps, regex, and more. Inspect data locally in your browser.",
  alternates: {
    canonical: "https://webtoolseasy.com/studio",
  },
};

export default function StudioPage() {
  return <Studio />;
}
