import Link from "next/link";
import { Metadata } from "next";
import { workflowPacks } from "@/data/workflows";
import { AppHeading } from "@/components/commonComponents";
import { AppBox, AppChip, AppText } from "@/components/lib/ui";
import { evaluateTemplateQuality } from "@/lib/templateQuality";
import {
  StructuredData,
  generateFAQPageSchema,
} from "@/components/structuredData";

export const metadata: Metadata = {
  title: "Workflow Templates - Reusable Recipe Starters",
  description:
    "Clone reusable workflow templates to speed up recurring web tasks.",
  alternates: {
    canonical: `${process.env.HOSTNAME}/templates`,
  },
};

export default async function TemplatesPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ category?: string; useCase?: string }>;
}>) {
  const query = await searchParams;
  const categories = Array.from(
    new Set(workflowPacks.map((item) => item.category)),
  );
  const useCases = Array.from(
    new Set(workflowPacks.flatMap((item) => item.tags.slice(0, 2))),
  );

  const selectedCategory = query.category ?? "";
  const selectedUseCase = query.useCase ?? "";

  const filtered = workflowPacks.filter((workflow) => {
    const categoryOk =
      selectedCategory.length === 0 || workflow.category === selectedCategory;
    const useCaseOk =
      selectedUseCase.length === 0 || workflow.tags.includes(selectedUseCase);
    const quality = evaluateTemplateQuality(workflow, workflowPacks);
    return categoryOk && useCaseOk && quality.isPublishable;
  });

  return (
    <>
      <StructuredData
        data={generateFAQPageSchema({
          faqs: [
            {
              question: "What are workflow templates?",
              answer:
                "Workflow templates are reusable starter recipes for repeatable tasks.",
            },
            {
              question: "Do template workflows upload my data?",
              answer:
                "Template workflows are designed for local-first processing with metadata-only sync options.",
            },
          ],
        })}
      />
      <div className="w-full flex flex-col gap-5">
        <AppHeading heading="Templates" />
        <AppText color="textSecondary">
          Reusable recipe starters for recurring tasks. Clone a template and run
          it in your browser with local-first privacy.
        </AppText>

        <div className="flex flex-col gap-2">
          <AppText className="!font-semibold">Filter by category</AppText>
          <div className="flex flex-wrap gap-2">
            <Link href="/templates" className="no-underline">
              <AppChip size="small" label="All" color="primary" />
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/templates?category=${encodeURIComponent(category)}`}
                className="no-underline"
              >
                <AppChip size="small" label={category} variant="outlined" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <AppText className="!font-semibold">Filter by use case</AppText>
          <div className="flex flex-wrap gap-2">
            <Link href="/templates" className="no-underline">
              <AppChip size="small" label="All" color="secondary" />
            </Link>
            {useCases.map((useCase) => (
              <Link
                key={useCase}
                href={`/templates?useCase=${encodeURIComponent(useCase)}`}
                className="no-underline"
              >
                <AppChip size="small" label={useCase} variant="outlined" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((workflow) => {
            const quality = evaluateTemplateQuality(workflow, workflowPacks);
            return (
              <Link
                key={workflow.id}
                href={`/templates/${workflow.slug}`}
                className="no-underline"
              >
                <AppBox className="app-shell-section h-full flex flex-col gap-2 hover:shadow-md transition-shadow">
                  <AppText className="!font-semibold">
                    {workflow.name} Starter
                  </AppText>
                  <AppText variant="body2" color="textSecondary">
                    {workflow.summary}
                  </AppText>
                  <div className="flex gap-2">
                    <AppChip size="small" label="Starter" color="primary" />
                    <AppChip
                      size="small"
                      label={`${workflow.steps.length} steps`}
                    />
                    <AppChip
                      size="small"
                      color="success"
                      variant="outlined"
                      label={`Quality ${quality.score}`}
                    />
                  </div>
                  <AppText variant="body2" className="!font-semibold">
                    View template details
                  </AppText>
                </AppBox>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
