"use client";

export function CodeEditor({
  language,
  theme,
  value,
  onChange,
}: Readonly<{
  language: string;
  theme: string;
  value: string;
  onChange: (value: string) => void;
}>) {
  return (
    <div className="column-display base-flex-gap full-width flex-vr-center">
      <h1>Editor</h1>
    </div>
  );
}
