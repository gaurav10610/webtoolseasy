"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Studio } from "@/components/devlens/Studio";
import { Badge } from "@/components/ui/Badge";

export default function DevLensPage() {
  return (
    <AppLayout mainClassName="relative">
      <div className="pointer-events-none absolute left-[10%] top-[0%] h-[40%] w-[50%] rounded-full bg-teal-600/10 blur-[100px]" />
      
      <div className="pt-10 pb-20">
        <div className="mb-6 flex flex-col justify-start items-start gap-2 shrink-0">
          <Badge variant="success" className="mb-2 text-teal-400 bg-teal-500/20 border-teal-500/30">Auto-Detect & Local History</Badge>
          <h1 className="text-3xl font-black text-white tracking-tight">
            DevLens Smart Studio
          </h1>
          <p className="text-gray-400 max-w-3xl">
            Paste JWT, JSON, Base64, Regex, Cron, or SQL. DevLens instantly auto-detects the payload and routes it to a specialized offline decoding workbench.
          </p>
        </div>

        <Studio />
      </div>
    </AppLayout>
  );
}
