import { diffLines, diffJson, Change } from 'diff';

export type DiffResult = {
  isValid: boolean;
  changes: Change[];
  error?: string;
};

export function computeTextDiff(oldText: string, newText: string): DiffResult {
  try {
    const changes = diffLines(oldText || "", newText || "");
    return {
      isValid: true,
      changes
    };
  } catch (err: any) {
    return {
      isValid: false,
      changes: [],
      error: err.message || "Failed to compute text diff"
    };
  }
}

export function computeJsonDiff(oldJsonStr: string, newJsonStr: string): DiffResult {
  try {
    let oldObj = oldJsonStr ? JSON.parse(oldJsonStr) : {};
    let newObj = newJsonStr ? JSON.parse(newJsonStr) : {};
    
    const changes = diffJson(oldObj, newObj);
    return {
      isValid: true,
      changes
    };
  } catch (err: any) {
    return {
      isValid: false,
      changes: [],
      error: err.message || "Invalid JSON syntax. Ensure both inputs are valid JSON."
    };
  }
}
