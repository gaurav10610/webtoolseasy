import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebToolsEasy | DevLens and ArchCost",
  description:
    "A privacy-first developer studio for smart data inspection and cloud cost planning. DevLens and ArchCost run locally first with shareable configurations.",
  keywords:
    "DevLens, ArchCost, JWT decoder, JSON inspector, Base64 encoder, cloud cost planner, privacy-first developer tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.className} bg-[#0A0A0B] text-gray-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
