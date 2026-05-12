import { AppText } from "@/components/lib/ui";

interface WorkflowEnhancementsProps {
  workflowName: string;
  workflowSlug: string;
  summary: string;
}

export function WorkflowProofSection({
  workflowName,
  summary,
}: Pick<WorkflowEnhancementsProps, "workflowName" | "summary">) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Why This Workflow
      </h2>
      <AppText color="textSecondary">{summary}</AppText>
      <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
        <li>Validated for local-first execution patterns.</li>
        <li>Designed with explicit step-by-step transformations.</li>
        <li>Optimized for repeatability and predictable outputs.</li>
      </ul>
      <p className="mt-3 text-xs text-slate-500">
        Proof-driven guidance for {workflowName} users.
      </p>
    </section>
  );
}

export function WorkflowTrustBadges({
  workflowSlug,
}: Pick<WorkflowEnhancementsProps, "workflowSlug">) {
  const badges = [
    "Local Processing First",
    "No Raw File Upload Required",
    "Privacy Guardrails Enabled",
  ];

  return (
    <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
        Trust Badges
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={`${workflowSlug}-${badge}`}
            className="rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-medium text-emerald-800"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}

export function WorkflowPrivacyDisclaimer({
  workflowName,
}: Pick<WorkflowEnhancementsProps, "workflowName">) {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <h3 className="font-semibold">Privacy Disclaimer</h3>
      <p className="mt-2">
        {workflowName} is designed to process data locally where possible.
        Optional telemetry and metadata sync paths are aggregate-only and
        intentionally exclude raw file contents, secrets, and credentials.
      </p>
    </section>
  );
}

export function WorkflowLegalCopy() {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <h3 className="font-semibold text-slate-900">Template Sharing Terms</h3>
      <p className="mt-2">
        By publishing a template, you confirm you have rights to the content, do
        not include regulated or private data, and consent to community
        moderation and removal for policy violations.
      </p>
    </section>
  );
}

export function WorkflowSupportHooks({
  workflowSlug,
}: Pick<WorkflowEnhancementsProps, "workflowSlug">) {
  const supportLinks = _getWorkflowSupportLinks(workflowSlug);

  return (
    <section className="rounded-lg border border-sky-200 bg-sky-50 p-4">
      <h3 className="text-sm font-semibold text-sky-900">
        Need Help After Completion?
      </h3>
      <ul className="mt-2 space-y-1 text-sm text-sky-900">
        {supportLinks.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="underline underline-offset-2">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function _getWorkflowSupportLinks(workflowSlug: string): Array<{
  label: string;
  href: string;
}> {
  const playbookBySlug: Record<string, string> = {
    "api-payload-cleanup": "/blog/api-payload-cleanup-workflow-playbook",
    "blog-publish": "/blog/blog-publish-workflow-playbook",
    "technical-seo-quick-audit":
      "/blog/technical-seo-quick-audit-workflow-playbook",
  };

  return [
    {
      label: "Open support request",
      href: `/support?workflow=${encodeURIComponent(workflowSlug)}`,
    },
    {
      label: "Share feedback",
      href: `/contact?topic=workflow-feedback&slug=${encodeURIComponent(workflowSlug)}`,
    },
    {
      label: "View troubleshooting guide",
      href: `/docs/workflows/${encodeURIComponent(workflowSlug)}#troubleshooting`,
    },
    {
      label: "Read workflow playbook",
      href: playbookBySlug[workflowSlug] || "/blog",
    },
  ];
}

export default function WorkflowEnhancements(props: WorkflowEnhancementsProps) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <WorkflowProofSection
        workflowName={props.workflowName}
        summary={props.summary}
      />
      <WorkflowTrustBadges workflowSlug={props.workflowSlug} />
      <WorkflowPrivacyDisclaimer workflowName={props.workflowName} />
      <WorkflowLegalCopy />
      <WorkflowSupportHooks workflowSlug={props.workflowSlug} />
    </div>
  );
}
