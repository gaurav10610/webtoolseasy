"use client";

import { ChangeEvent } from "react";

type PasteInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function PasteInput({ value, onChange, placeholder }: PasteInputProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      className="min-h-[240px] w-full rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-sm leading-6 text-gray-100 outline-none transition-colors placeholder:text-gray-600 focus:border-indigo-500/60"
      placeholder={placeholder}
      spellCheck={false}
    />
  );
}
