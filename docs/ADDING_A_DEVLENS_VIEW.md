# Adding a DevLens Specialist View

DevLens uses a "Smart Paste" engine to automatically detect the format of pasted text and display a "Specialist View" with context-specific tools and formatting.

Adding a new specialist view involves three steps:
1. Writing a detector.
2. Creating the React component view.
3. Registering the view in the `PanelContainer`.

## 1. Write a Detector

Detectors live in `src/lib/devlens/detector.ts`. 

1. Add your new type to the `DetectionType` union type:
   ```typescript
   export type DetectionType = 
     // ... existing types
     | "your-new-type"
     | "unknown";
   ```

2. Write a detection function. It should return a confidence score (0 to 1). Be careful to make the detector as tight as possible to avoid false positives.
   ```typescript
   function detectYourType(input: string): number {
     const trimmed = input.trim();
     if (!trimmed) return 0;
     
     // Your detection logic here. Return 1 for certain match, 
     // 0 for no match, or a decimal for partial confidence.
     if (/^your-regex$/.test(trimmed)) {
       return 1;
     }
     return 0;
   }
   ```

3. Add your detector to the main `detect` function waterfall, ordered by specificity (more specific formats should be checked before generic formats like JSON).
   ```typescript
   export function detect(input: string): DetectionResult {
     // ... existing checks

     const yourTypeScore = detectYourType(input);
     if (yourTypeScore > 0.8) return { type: "your-new-type", confidence: yourTypeScore };

     // ... generic checks (JSON, etc.)
   }
   ```

## 2. Create the View Component

Create a new file in `src/components/devlens/views/YourTypeView.tsx`.

Views should receive `input` as a prop and render the specialized UI. Use the shared primitives from `src/components/ui/` whenever possible.

```tsx
import { useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";

type YourTypeViewProps = {
  input: string;
};

export function YourTypeView({ input }: YourTypeViewProps) {
  // Parse or format the input as needed
  
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
          Your Type Inspector
        </h3>
        {/* Your UI here */}
      </div>
    </div>
  );
}
```

## 3. Register the View

Open `src/components/devlens/PanelContainer.tsx`.

1. Import your new view.
2. Add a boolean flag for your type detection.
   ```tsx
   const isYourType = panel.detection.type === "your-new-type";
   ```
3. Add it to the render conditional logic inside the `Panel` component body:
   ```tsx
   {isUnknown ? (
     <UnknownView input={panel.input} />
   ) : isYourType ? (
     <YourTypeView input={panel.input} />
   ) : /* ... other types */ }
   ```

## 4. Testing

Ensure you write unit tests for your detector in `src/__tests__/devlens/detector.test.ts` and view logic if applicable. Restart your dev server to see the new view in action!
