import { notFound } from "next/navigation";
import { Metadata } from "next";
import { workflowBySlug, workflowPacks } from "@/data/workflows";
import WorkflowRunner from "@/components/workflows/WorkflowRunner";
import { AppHeading } from "@/components/commonComponents";
import { AppText } from "@/components/lib/ui";

export async function generateStaticParams() {
  return workflowPacks.map((pack) => ({ slug: pack.slug }));
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
    <div className="w-full flex flex-col gap-4">
      <AppHeading heading={workflow.name} />
      <AppText color="textSecondary">{workflow.summary}</AppText>
      <WorkflowRunner workflow={workflow} template={template} recipe={recipe} />
    </div>
  );
}
