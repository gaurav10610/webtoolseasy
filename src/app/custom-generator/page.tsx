"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { faker } from "@faker-js/faker";

type FieldType = "UUID" | "String" | "Number" | "Boolean" | "Email" | "FullName" | "Avatar" | "Paragraph" | "Date";

type SchemaField = {
  id: string;
  name: string;
  type: FieldType;
};

const FIELD_TYPES: FieldType[] = [
  "UUID", "String", "Number", "Boolean", "Email", "FullName", "Avatar", "Paragraph", "Date"
];

export default function CustomGeneratorPage() {
  const [fields, setFields] = useState<SchemaField[]>([
    { id: "1", name: "id", type: "UUID" },
    { id: "2", name: "name", type: "FullName" },
    { id: "3", name: "email", type: "Email" },
  ]);
  
  const [rowCount, setRowCount] = useState<number>(10);
  const [generatedData, setGeneratedData] = useState<string>("");

  const addField = () => {
    setFields([...fields, { id: Math.random().toString(36).substr(2, 9), name: "newField", type: "String" }]);
  };

  const removeField = (id: string) => {
    if (fields.length <= 1) return;
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<SchemaField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const generateData = () => {
    try {
      const data = Array.from({ length: rowCount }).map(() => {
        const row: Record<string, any> = {};
        fields.forEach(field => {
          let val: any = "";
          switch (field.type) {
            case "UUID": val = faker.string.uuid(); break;
            case "String": val = faker.lorem.word(); break;
            case "Number": val = faker.number.int({ min: 1, max: 1000 }); break;
            case "Boolean": val = faker.datatype.boolean(); break;
            case "Email": val = faker.internet.email(); break;
            case "FullName": val = faker.person.fullName(); break;
            case "Avatar": val = faker.image.avatar(); break;
            case "Paragraph": val = faker.lorem.paragraph(); break;
            case "Date": val = faker.date.recent().toISOString(); break;
          }
          row[field.name] = val;
        });
        return row;
      });
      setGeneratedData(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(e);
      setGeneratedData("Error generating data.");
    }
  };

  const downloadJson = () => {
    if (!generatedData) return;
    const blob = new Blob([generatedData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mock-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppLayout mainClassName="relative">
      <div className="pointer-events-none absolute right-[10%] top-[10%] h-[30%] w-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
      
      <div className="mx-auto max-w-6xl pt-10 pb-20">
        <div className="text-center mb-12">
          <Badge variant="info" className="mb-4">Runs entirely in your browser</Badge>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Custom API Generator
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Design your exact JSON schema and instantly generate thousands of rows of realistic test data. No database or server required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column: Schema Builder */}
          <div className="bg-[#121214]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md flex flex-col h-[700px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">1. Define Schema</h2>
              <button 
                onClick={addField}
                className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
              >
                + Add Field
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {fields.map((field) => (
                <div key={field.id} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl group hover:bg-white/10 transition-colors">
                  <input 
                    type="text" 
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                    placeholder="field_name"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none min-w-[120px]"
                  >
                    {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <button 
                    onClick={() => removeField(field.id)}
                    className="text-gray-500 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={fields.length <= 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 2-2-2-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-gray-300">Row Count</label>
                <input 
                  type="number" 
                  min="1" max="1000"
                  value={rowCount}
                  onChange={(e) => setRowCount(parseInt(e.target.value) || 10)}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-24 text-right"
                />
              </div>
              <button 
                onClick={generateData}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] active:scale-[0.98]"
              >
                Generate Data
              </button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="bg-[#0A0A0B] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col h-[700px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">2. Output</h2>
              <button 
                onClick={downloadJson}
                disabled={!generatedData}
                className="text-xs font-bold bg-green-500/20 text-green-400 hover:bg-green-500/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download JSON
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#121214] relative">
              {generatedData ? (
                <textarea 
                  readOnly
                  value={generatedData}
                  className="absolute inset-0 w-full h-full bg-transparent text-gray-300 font-mono text-xs p-4 resize-none focus:outline-none"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                  Click "Generate Data" to see output here.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
