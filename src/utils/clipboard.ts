export async function readClipboard(): Promise<string> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.readText) {
    try {
      return await navigator.clipboard.readText();
    } catch {
      // Fall through to the prompt-based fallback below.
    }
  }

  if (typeof window === "undefined") {
    throw new Error("Clipboard access is only available in the browser");
  }

  const fallback = window.prompt("Paste text here");
  return fallback ?? "";
}
