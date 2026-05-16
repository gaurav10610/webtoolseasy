import { redirect } from "next/navigation";

type SharedPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SharedPage({ params }: SharedPageProps) {
  // Keep the dynamic segment for future server-backed shares while using
  // the current no-database canvas flow.
  await params;
  redirect("/canvas");
}
