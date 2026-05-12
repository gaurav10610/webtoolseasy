import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  featuredWorkflowSlugs,
  workflowBySlug,
  workflowPacks,
} from "@/data/workflows";
import WorkflowRunner from "@/components/workflows/WorkflowRunner";
import WorkflowEnhancements from "@/components/workflows/WorkflowEnhancements";
import { AppHeading } from "@/components/commonComponents";
import { AppText } from "@/components/lib/ui";
import {
  StructuredData,
  generateFAQPageSchema,
  generateHowToSchema,
} from "@/components/structuredData";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 86400;

export async function generateStaticParams() {
  const availableSlugs = new Set(workflowPacks.map((pack) => pack.slug));

  for (const featuredSlug of featuredWorkflowSlugs) {
    if (workflowBySlug[featuredSlug]) {
      availableSlugs.add(featuredSlug);
    }
  }

  return Array.from(availableSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workflow = workflowBySlug[slug];

  if (!workflow) {
    return {
      title: "Workflow not found",
    };
  }

  return {
    title: `${workflow.name} - Workflow Pack`,
    description: workflow.summary,
    alternates: {
      canonical: `${process.env.HOSTNAME}/workflows/${workflow.slug}`,
    },
    openGraph: {
      title: `${workflow.name} - Workflow Pack`,
      description: workflow.summary,
      url: `${process.env.HOSTNAME}/workflows/${workflow.slug}`,
    },
  };
}

export default async function WorkflowDetailPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ template?: string; recipe?: string }>;
}>) {
  const { slug } = await params;
  const { template, recipe } = await searchParams;
  const workflow = workflowBySlug[slug];

  if (!workflow) {
    notFound();
  }

  return (
    <>
      <StructuredData
        data={generateHowToSchema({
          name: workflow.name,
          description: workflow.summary,
          steps: workflow.steps.map((step) => ({
            name: step.title,
            text: step.description,
          })),
          totalTime: `PT${Math.max(2, workflow.steps.length * 2)}M`,
        })}
      />
      <StructuredData
        data={generateFAQPageSchema({
          faqs: [
            {
              question: `What is ${workflow.name}?`,
              answer: workflow.summary,
            },
            {
              question: "Does this workflow upload my files?",
              answer:
                "Workflow steps are local-first and explicitly labeled by data flow mode.",
            },
          ],
        })}
      />
      <div className="w-full flex flex-col gap-4">
        <AppHeading heading={workflow.name} />
        <AppText color="textSecondary">{workflow.summary}</AppText>
        <WorkflowRunner
          workflow={workflow}
          template={template}
          recipe={recipe}
        />
        <WorkflowEnhancements
          workflowName={workflow.name}
          workflowSlug={workflow.slug}
          summary={workflow.summary}
        />
      </div>
    </>
  );
}
