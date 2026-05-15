import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { EnvView } from "@/components/devlens/views/EnvView";

const SAMPLE_ENV = `# Database config
DATABASE_URL=postgres://localhost:5432/mydb
DB_PASSWORD="super_secret_pass"
NODE_ENV=production
PORT=3000
# API keys
STRIPE_SECRET_KEY=sk_live_abc123
ENABLE_DEBUG=false
`.trim();

describe("EnvView", () => {
  it("renders variable count", () => {
    const html = renderToStaticMarkup(<EnvView input={SAMPLE_ENV} />);
    expect(html).toContain("6"); // 6 variables
    expect(html).toContain("variables");
  });

  it("renders comment count", () => {
    const html = renderToStaticMarkup(<EnvView input={SAMPLE_ENV} />);
    expect(html).toContain("2"); // 2 comment lines
    expect(html).toContain("Comments");
  });

  it("masks secret keys", () => {
    const html = renderToStaticMarkup(<EnvView input={SAMPLE_ENV} />);
    expect(html).toContain("secret");
    // The actual secret value should not appear fully visible
    expect(html).not.toContain("sk_live_abc123");
  });

  it("shows empty state when no variables", () => {
    const html = renderToStaticMarkup(<EnvView input="# just a comment\n" />);
    expect(html).toContain("No variables found");
  });
});
