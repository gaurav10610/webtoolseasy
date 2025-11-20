"use client";

import { useState, useCallback, useMemo } from "react";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
} from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface RobotRule {
  id: number;
  type: "allow" | "disallow";
  path: string;
}

export default function RobotsTxtGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [userAgent, setUserAgent] = useState("*");
  const [rules, setRules] = useState<RobotRule[]>([
    { id: 1, type: "disallow", path: "/admin/" },
    { id: 2, type: "disallow", path: "/private/" },
  ]);
  const [sitemapUrl, setSitemapUrl] = useState(
    "https://www.example.com/sitemap.xml"
  );
  const [crawlDelay, setCrawlDelay] = useState("");
  const [nextId, setNextId] = useState(3);

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const generateRobotsTxt = useCallback((): string => {
    const lines: string[] = [];

    // User-agent
    lines.push(`User-agent: ${userAgent}`);

    // Rules
    rules.forEach((rule) => {
      if (rule.path.trim()) {
        const directive = rule.type === "allow" ? "Allow" : "Disallow";
        lines.push(`${directive}: ${rule.path}`);
      }
    });

    // Crawl delay
    if (crawlDelay && parseInt(crawlDelay) > 0) {
      lines.push(`Crawl-delay: ${crawlDelay}`);
    }

    // Sitemap
    if (sitemapUrl.trim()) {
      lines.push(`\nSitemap: ${sitemapUrl}`);
    }

    return lines.join("\n");
  }, [userAgent, rules, sitemapUrl, crawlDelay]);

  const generatedRobotsTxt = useMemo(
    () => generateRobotsTxt(),
    [generateRobotsTxt]
  );

  const addRule = useCallback(() => {
    setRules((prev) => [...prev, { id: nextId, type: "disallow", path: "" }]);
    setNextId((prev) => prev + 1);
  }, [nextId]);

  const removeRule = useCallback((id: number) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
  }, []);

  const updateRule = useCallback(
    (id: number, field: keyof RobotRule, value: string) => {
      setRules((prev) =>
        prev.map((rule) =>
          rule.id === id ? { ...rule, [field]: value } : rule
        )
      );
    },
    []
  );

  const copyRobotsTxt = useCallback(() => {
    toolState.actions.copyText(generatedRobotsTxt, "Robots.txt copied!");
  }, [generatedRobotsTxt, toolState.actions]);

  const downloadRobotsTxt = useCallback(() => {
    const blob = new Blob([generatedRobotsTxt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Robots.txt downloaded!");
  }, [generatedRobotsTxt, toolState.actions]);

  const loadPreset = useCallback(
    (preset: string) => {
      switch (preset) {
        case "allow-all":
          setUserAgent("*");
          setRules([{ id: 1, type: "allow", path: "/" }]);
          setSitemapUrl("https://www.example.com/sitemap.xml");
          setCrawlDelay("");
          setNextId(2);
          break;
        case "block-all":
          setUserAgent("*");
          setRules([{ id: 1, type: "disallow", path: "/" }]);
          setSitemapUrl("");
          setCrawlDelay("");
          setNextId(2);
          break;
        case "wordpress":
          setUserAgent("*");
          setRules([
            { id: 1, type: "disallow", path: "/wp-admin/" },
            { id: 2, type: "allow", path: "/wp-admin/admin-ajax.php" },
            { id: 3, type: "disallow", path: "/wp-includes/" },
          ]);
          setSitemapUrl("https://www.example.com/sitemap_index.xml");
          setCrawlDelay("");
          setNextId(4);
          break;
        case "ecommerce":
          setUserAgent("*");
          setRules([
            { id: 1, type: "disallow", path: "/cart/" },
            { id: 2, type: "disallow", path: "/checkout/" },
            { id: 3, type: "disallow", path: "/account/" },
            { id: 4, type: "disallow", path: "/*?*" },
          ]);
          setSitemapUrl("https://www.example.com/sitemap.xml");
          setCrawlDelay("");
          setNextId(5);
          break;
      }
      toolState.actions.showMessage("Preset loaded!");
    },
    [toolState.actions]
  );

  const buttons = [
    {
      type: "custom" as const,
      text: "Copy Robots.txt",
      icon: <ContentCopyIcon />,
      onClick: copyRobotsTxt,
      variant: "contained" as const,
    },
    {
      type: "custom" as const,
      text: "Download File",
      icon: <DownloadIcon />,
      onClick: downloadRobotsTxt,
      variant: "outlined" as const,
    },
  ];

  const userAgents = [
    { value: "*", label: "All Bots (*)" },
    { value: "Googlebot", label: "Googlebot (Google)" },
    { value: "Bingbot", label: "Bingbot (Bing)" },
    { value: "Slurp", label: "Slurp (Yahoo)" },
    { value: "DuckDuckBot", label: "DuckDuckBot (DuckDuckGo)" },
    { value: "Baiduspider", label: "Baiduspider (Baidu)" },
    { value: "YandexBot", label: "YandexBot (Yandex)" },
  ];

  return (
    <ToolLayout
      snackBar={{
        open: toolState.snackBar.open,
        message: toolState.snackBar.message,
        onClose: toolState.snackBar.close,
      }}
    >
      <SEOContent
        title="Free Robots.txt Generator"
        description="Create robots.txt file for SEO. Control search engine crawlers with user-agents, allow/disallow rules, and sitemap references."
        exampleCode="Configure rules → Generate → Upload to root"
        exampleOutput="Valid robots.txt file ready to use"
      />

      <ToolControls buttons={buttons} />

      {/* Presets */}
      <Card>
        <CardContent>
          <Typography variant="subtitle2" className="font-semibold mb-2">
            Quick Presets:
          </Typography>
          <div className="flex flex-wrap gap-2">
            <Chip
              label="Allow All"
              onClick={() => loadPreset("allow-all")}
              clickable
              color="success"
              size="small"
            />
            <Chip
              label="Block All"
              onClick={() => loadPreset("block-all")}
              clickable
              color="error"
              size="small"
            />
            <Chip
              label="WordPress"
              onClick={() => loadPreset("wordpress")}
              clickable
              color="primary"
              size="small"
            />
            <Chip
              label="E-commerce"
              onClick={() => loadPreset("ecommerce")}
              clickable
              color="secondary"
              size="small"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Configuration Panel */}
        <Card className="w-full md:w-1/2">
          <CardContent className="flex flex-col gap-4">
            <Typography variant="h6" className="font-semibold">
              Configure Robots.txt
            </Typography>

            <FormControl fullWidth size="small">
              <InputLabel>User-Agent</InputLabel>
              <Select
                value={userAgent}
                label="User-Agent"
                onChange={(e) => setUserAgent(e.target.value)}
              >
                {userAgents.map((agent) => (
                  <MenuItem key={agent.value} value={agent.value}>
                    {agent.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Typography variant="subtitle2" className="font-semibold">
                  Allow/Disallow Rules
                </Typography>
                <IconButton
                  size="small"
                  onClick={addRule}
                  color="primary"
                  title="Add rule"
                >
                  <AddIcon />
                </IconButton>
              </div>

              {rules.map((rule) => (
                <div key={rule.id} className="flex gap-2 mb-2">
                  <FormControl size="small" className="w-32">
                    <Select
                      value={rule.type}
                      onChange={(e) =>
                        updateRule(rule.id, "type", e.target.value)
                      }
                    >
                      <MenuItem value="allow">Allow</MenuItem>
                      <MenuItem value="disallow">Disallow</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    size="small"
                    value={rule.path}
                    onChange={(e) =>
                      updateRule(rule.id, "path", e.target.value)
                    }
                    placeholder="/path/"
                    fullWidth
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeRule(rule.id)}
                    color="error"
                    disabled={rules.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>

            <TextField
              label="Crawl Delay (seconds)"
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(e.target.value)}
              fullWidth
              size="small"
              type="number"
              helperText="Optional: Time between requests (usually 1-10)"
            />

            <TextField
              label="Sitemap URL"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              fullWidth
              size="small"
              helperText="Full URL to your sitemap.xml file"
            />

            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2" className="font-semibold mb-2">
                  Common Paths to Block:
                </Typography>
                <Typography variant="body2" className="text-sm">
                  • <code>/admin/</code> - Admin panels
                  <br />• <code>/wp-admin/</code> - WordPress admin
                  <br />• <code>/cart/</code> - Shopping carts
                  <br />• <code>/private/</code> - Private directories
                  <br />• <code>{`/*?*`}</code> - URLs with parameters
                  <br />• <code>{`/*.pdf$`}</code> - Specific file types
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="w-full md:w-1/2">
          <CardContent className="flex flex-col gap-4">
            <Typography variant="h6" className="font-semibold">
              Generated Robots.txt
            </Typography>

            <div className="bg-gray-50 p-4 rounded border border-gray-300 min-h-[300px]">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {generatedRobotsTxt}
              </pre>
            </div>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2" className="font-semibold mb-2">
                  How to deploy:
                </Typography>
                <Typography variant="body2" className="text-sm">
                  1. Download or copy the robots.txt file
                  <br />
                  2. Upload to your website&apos;s root directory
                  <br />
                  3. Verify at: https://yoursite.com/robots.txt
                  <br />
                  4. Test with Google Search Console
                  <br />
                  5. Monitor crawler behavior in analytics
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" className="bg-yellow-50">
              <CardContent>
                <Typography variant="body2" className="font-semibold mb-1">
                  ⚠️ Important Notes:
                </Typography>
                <Typography variant="body2" className="text-sm">
                  • Blocking pages doesn&apos;t guarantee privacy
                  <br />
                  • Malicious bots may ignore robots.txt
                  <br />
                  • Don&apos;t block CSS/JS needed for rendering
                  <br />• Test thoroughly before deploying
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
