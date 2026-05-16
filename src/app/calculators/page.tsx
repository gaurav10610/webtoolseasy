import { calculatorPages } from "@/data/calculatorPages";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AWS Cost Calculators | WebToolsEasy",
  description:
    "Visual cloud cost estimators for Amazon EC2, RDS, S3, Lambda, and more.",
  alternates: {
    canonical: "https://webtoolseasy.com/calculators",
  },
};

export default function CalculatorsIndex() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">AWS Cost Calculators</h1>
        <p className="text-gray-400 mb-8">
          Select an AWS service below to estimate its monthly cost and view best
          practices for cost optimization.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {calculatorPages.map((calc) => (
            <Link
              key={calc.service}
              href={`/calculators/${calc.service.toLowerCase()}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <code className="text-amber-400 font-bold bg-amber-400/10 px-2 py-1 rounded">
                  {calc.service}
                </code>
                <span className="text-lg font-semibold">{calc.name}</span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {calc.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
