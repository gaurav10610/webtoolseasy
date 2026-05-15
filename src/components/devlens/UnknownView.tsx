import { CopyButton } from "@/components/ui/CopyButton";
import { EmptyState } from "@/components/ui/EmptyState";

type UnknownViewProps = {
  input: string;
};

export function UnknownView({ input }: UnknownViewProps) {
  return (
    <div className="space-y-4">
      <EmptyState
        icon="?"
        title="Unknown input"
        description="DevLens could not confidently classify this yet. Try a JWT, JSON object, Base64 string, URL, timestamp, UUID, or regex pattern."
      />
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Raw input
          </div>
          <CopyButton text={input} label="Copy raw" />
        </div>
        <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-sm leading-6 text-gray-200">
          {input || "Nothing to inspect yet."}
        </pre>
      </div>
    </div>
  );
}
