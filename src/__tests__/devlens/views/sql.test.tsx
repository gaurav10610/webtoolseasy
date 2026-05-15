import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SqlView } from "@/components/devlens/views/SqlView";

describe("SqlView", () => {
  it("detects SELECT query type", () => {
    const html = renderToStaticMarkup(
      <SqlView input="SELECT id, name FROM users WHERE active = 1 ORDER BY name" />,
    );
    expect(html).toContain("SELECT");
  });

  it("extracts table names", () => {
    const html = renderToStaticMarkup(
      <SqlView input="SELECT u.id FROM users u JOIN orders o ON u.id = o.user_id" />,
    );
    expect(html).toContain("users");
  });

  it("detects INSERT query type", () => {
    const html = renderToStaticMarkup(
      <SqlView input="INSERT INTO products (name, price) VALUES ('Widget', 9.99)" />,
    );
    expect(html).toContain("INSERT");
  });

  it("renders formatted output", () => {
    const html = renderToStaticMarkup(
      <SqlView input="select id,name from users where id=1" />,
    );
    expect(html).toContain("Formatted");
  });
});
