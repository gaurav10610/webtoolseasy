import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Edge } from "@xyflow/react";
import { ArchitectureCanvas } from "@/components/canvas/ArchitectureCanvas";
import { ensureArchitectureTable, getDb } from "@/lib/db";
import { decompressArchitecture } from "@/lib/archcost/shareUrl";

type SharedTemplate = {
  nodes: Array<{ data?: { label?: string; costPerMonth?: number } }>;
  edges: Edge[];
};

const SITE_URL = "https://webtoolseasy.com";

async function loadSharedTemplate(id: string): Promise<SharedTemplate | null> {
  await ensureArchitectureTable();
  const client = getDb();
  const result = await client.query({
    text: "SELECT data FROM architectures WHERE id = $1 OR slug = $1",
    values: [id],
  });

  if (result.rows.length === 0) {
    return null;
  }

  const compressedData = result.rows[0].data as string;
  const decoded = decompressArchitecture(compressedData);

  if ("error" in decoded) {
    throw new Error(decoded.error);
  }

  const parsed = decoded.payload;

  if (!Array.isArray(parsed?.nodes) || !Array.isArray(parsed?.edges)) {
    throw new Error("Invalid shared architecture payload");
  }

  return parsed as SharedTemplate;
}

function getSharedCost(template: SharedTemplate): number {
  return template.nodes.reduce((total, node) => {
    const value = Number(node.data?.costPerMonth ?? 0);
    return Number.isFinite(value) ? total + value : total;
  }, 0);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const canonical = `${SITE_URL}/shared/${id}`;

  let title = "Shared Architecture | ArchCost";
  let description =
    "View this shared cloud architecture and cost estimate on ArchCost.";
  let ogImage = `${canonical}/opengraph-image`;

  try {
    const template = await loadSharedTemplate(id);
    if (template) {
      const cost = getSharedCost(template);
      const label = template.nodes.find((node) => node.data?.label)?.data
        ?.label;
      const architectureName = label || `Shared Architecture ${id}`;

      title = `${architectureName} | ArchCost`;
      description = `Estimated monthly cost: $${cost.toFixed(2)}. Open this shared architecture in ArchCost.`;

      const imageUrl = new URL(ogImage);
      imageUrl.searchParams.set("name", architectureName);
      imageUrl.searchParams.set("cost", cost.toFixed(2));
      ogImage = imageUrl.toString();
    }
  } catch (error) {
    console.error("Failed to generate shared architecture metadata:", error);
  }

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Shared architecture preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SharedArchitecturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let initialTemplate: SharedTemplate | null = null;

  try {
    initialTemplate = await loadSharedTemplate(id);

    if (!initialTemplate) {
      notFound();
    }

    await ensureArchitectureTable();
    const client = getDb();
    client
      .query({
        text: "UPDATE architectures SET view_count = view_count + 1 WHERE id = $1 OR slug = $1",
        values: [id],
      })
      .catch(() => {});
  } catch (err) {
    console.error("Failed to load shared architecture:", err);
    notFound();
  }

  return (
    <main className="w-full h-screen bg-[#0A0A0B] flex flex-col">
      <ArchitectureCanvas initialTemplate={initialTemplate ?? undefined} />
    </main>
  );
}
