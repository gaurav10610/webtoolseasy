import { Metadata } from "next";
import FounderMetricsDashboard from "@/components/workflows/FounderMetricsDashboard";

export const metadata: Metadata = {
  title: "Workflow Insights Dashboard",
  description: "Activation, retention, and growth metrics for workflow usage.",
  alternates: {
    canonical: `${process.env.HOSTNAME}/workflows/insights`,
  },
};

export default function WorkflowInsightsPage() {
  return <FounderMetricsDashboard />;
}
