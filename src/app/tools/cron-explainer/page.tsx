"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { analyzeCron, buildCron, CronData } from "@/utils/cronUtils";

export default function CronExplainerPage() {
  const [cronStr, setCronStr] = useState<string>("*/15 0 1,15 * 1-5");
  const [data, setData] = useState<CronData | null>(null);

  // Builder State
  const [minute, setMinute] = useState("*/15");
  const [hour, setHour] = useState("0");
  const [dayOfMonth, setDayOfMonth] = useState("1,15");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("1-5");

  // Sync Builder -> String
  useEffect(() => {
    const built = buildCron(minute, hour, dayOfMonth, month, dayOfWeek);
    if (built !== cronStr) {
      setCronStr(built);
    }
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  // Sync String -> Data and Builder (if valid)
  useEffect(() => {
    if (!cronStr.trim()) {
      setData(null);
      return;
    }
    
    const result = analyzeCron(cronStr, 5);
    setData(result);
    
    if (result.isValid) {
      const parts = cronStr.trim().split(/\s+/);
      if (parts.length >= 5) {
        setMinute(parts[0]);
        setHour(parts[1]);
        setDayOfMonth(parts[2]);
        setMonth(parts[3]);
        setDayOfWeek(parts[4]);
      }
    }
  }, [cronStr]);

  return (
    <AppLayout mainClassName="relative" fullWidth={true}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 flex flex-col min-h-[calc(100vh-80px)]">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <Badge variant="info" className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Client-Side Parser</Badge>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              Visual Cron Explorer
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Understand complex cron schedules instantly. Translate syntax into plain English and visualize the next execution dates.
            </p>
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-12 gap-6 min-h-[500px]">
          {/* Left Column: Input and Builder */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#121214] border border-white/10 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-gray-300">Cron Expression</label>
                {data?.error && <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">Invalid Syntax</span>}
              </div>
              <input 
                type="text" 
                value={cronStr}
                onChange={(e) => setCronStr(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-emerald-400 font-mono text-xl text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                spellCheck="false"
              />
              
              {data?.isValid && (
                <div className="mt-6 text-center">
                  <p className="text-lg text-white font-medium">"{data.humanReadable}"</p>
                </div>
              )}
            </div>

            <div className="bg-[#121214] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden flex-1">
              <div className="bg-white/5 border-b border-white/10 px-6 py-4">
                <span className="text-sm font-bold text-gray-300">Interactive Builder</span>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Minute</label>
                  <input type="text" value={minute} onChange={e => setMinute(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Hour</label>
                  <input type="text" value={hour} onChange={e => setHour(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Day (Month)</label>
                  <input type="text" value={dayOfMonth} onChange={e => setDayOfMonth(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Month</label>
                  <input type="text" value={month} onChange={e => setMonth(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Day (Week)</label>
                  <input type="text" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50" />
                </div>
              </div>
              
              <div className="px-6 pb-6 text-xs text-gray-500 leading-relaxed">
                <p className="mb-2"><strong className="text-gray-400">Allowed values:</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Minute: 0-59</li>
                  <li>Hour: 0-23</li>
                  <li>Day of Month: 1-31</li>
                  <li>Month: 1-12 (or JAN-DEC)</li>
                  <li>Day of Week: 0-6 (Sun-Sat)</li>
                </ul>
                <p className="mt-3"><strong className="text-gray-400">Special characters:</strong> <code className="bg-black/30 px-1 py-0.5 rounded">*</code> (any), <code className="bg-black/30 px-1 py-0.5 rounded">,</code> (value list), <code className="bg-black/30 px-1 py-0.5 rounded">-</code> (range), <code className="bg-black/30 px-1 py-0.5 rounded">/</code> (step)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Next Executions */}
          <div className="lg:col-span-5 bg-[#0A0A0B] border border-white/10 rounded-2xl flex flex-col shadow-xl overflow-hidden">
             <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center">
              <span className="text-sm font-bold text-emerald-400">Next Scheduled Runs</span>
            </div>
            <div className="flex-1 p-6">
              {data && data.isValid ? (
                <div className="space-y-3">
                  {data.nextDates.map((date, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#121214] border border-white/5 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                      <div className="text-xl font-bold text-gray-500 w-6">{i + 1}</div>
                      <div>
                        <div className="text-white font-medium">{date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        <div className="text-emerald-400 font-mono text-sm mt-1">{date.toLocaleTimeString(undefined, { hour12: false })}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 text-center px-4">
                  {data?.error ? "Fix the syntax errors to view the schedule." : "Enter a cron expression to see when it runs next."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
