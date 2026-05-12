import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { workflowBySlug, workflowPacks } from "@/data/workflows";
import { AppHeading } from "@/components/commonComponents";
import { AppBox, AppChip, AppText } from "@/components/lib/ui";
import { evaluateTemplateQuality } from "@/lib/templateQuality";
import {
  StructuredData,
  generateHowToSchema,
} from "@/components/structuredData";

export async function generateStaticParams() {
  return workflowPacks.map((workflow) => ({ slug: workflow.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workflow = workflowBySlug[slug];

  if (!workflow) {
    return { title: "Template not found" };
  }

  return {
    title: `${workflow.name} Template`,
    description: `Reusable ${workflow.name} workflow starter template.`,
    alternates: {
      canonical: `${process.env.HOSTNAME}/templates/${workflow.slug}`,
    },
  };
}

export default async function TemplateDetailPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const workflow = workflowBySlug[slug];

  if (!workflow) {
    notFound();
  }

  const quality = evaluateTemplateQuality(workflow, workflowPacks);

  return (
    <>
      <StructuredData
        data={generateHowToSchema({
          name: `${workflow.name} Template`,
          description: workflow.summary,
          steps: workflow.steps.map((step) => ({
            name: step.title,
            text: step.description,
          })),
          totalTime: `PT${Math.max(2, workflow.steps.length * 2)}M`,
        })}
      />
      <div className="w-full flex flex-col gap-4">
        <AppHeading heading={`${workflow.name} Template`} />
        <AppText color="textSecondary">
          Clone this starter to run the workflow with a reusable baseline.
        </AppText>

        <AppBox className="app-shell-section flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <AppChip
              label={workflow.category}
              color="primary"
              variant="outlined"
            />
            <AppChip
              label={`${workflow.steps.length} steps`}
              variant="outlined"
            />
            <AppChip label="Starter" color="secondary" />
            <AppChip
              label={`Quality ${quality.score}`}
              color={quality.isPublishable ? "success" : "warning"}
              variant="outlined"
            />
          </div>
          <AppText variant="body2" color="textSecondary">
            {workflow.summary}
          </AppText>
          <div className="flex flex-wrap gap-2">
            {workflow.tags.map((tag) => (
              <AppChip key={tag} size="small" label={tag} variant="outlined" />
            ))}
          </div>
          <Link
            href={`/workflows/${workflow.slug}?template=starter`}
            className="text-sm font-semibold underline"
          >
            Clone and run this template
          </Link>
        </AppBox>

        {quality.reasons.length > 0 && (
          <section className="rounded-xl border border-[var(--mui-palette-divider)] p-3">
            <AppText className="!font-semibold !mb-2">Quality Notes</AppText>
            <ul className="list-disc pl-5">
              {quality.reasons.map((reason) => (
                <li key={reason}>
                  <AppText variant="body2" color="textSecondary">
                    {reason}
                  </AppText>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-xl border border-[var(--mui-palette-divider)] p-3">
          <AppText className="!font-semibold !mb-2">Included steps</AppText>
          <ol className="list-decimal pl-5">
            {workflow.steps.map((step) => (
              <li key={step.id}>
                <AppText variant="body2">
                  {step.title} ({step.executionMode})
                </AppText>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
