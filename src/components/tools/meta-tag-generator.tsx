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
  Tabs,
  Tab,
} from "@mui/material";
import { ToolComponentProps } from "@/types/component";
import { useToolState } from "@/hooks/useToolState";
import { ToolLayout, SEOContent } from "../common/ToolLayout";
import { ToolControls } from "../common/ToolControls";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";

interface MetaTagData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  url: string;
  image: string;
  ogType: string;
  twitterCard: string;
  siteName: string;
  locale: string;
  robots: string;
}

export default function MetaTagGenerator({
  hostname,
  queryParams,
}: Readonly<ToolComponentProps>) {
  const [activeTab, setActiveTab] = useState(0);
  const [metaData, setMetaData] = useState<MetaTagData>({
    title: "My Awesome Website",
    description:
      "Discover amazing content and resources on our website. Join thousands of satisfied users today.",
    keywords: "website, online, resources, tools",
    author: "Your Name",
    url: "https://www.example.com",
    image: "https://www.example.com/image.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    siteName: "My Website",
    locale: "en_US",
    robots: "index, follow",
  });

  const toolState = useToolState({
    hostname: hostname || "",
    queryParams,
    initialValue: "",
  });

  const generateMetaTags = useCallback((): string => {
    const tags: string[] = [];

    // Basic HTML Meta Tags
    tags.push(`<!-- Primary Meta Tags -->`);
    tags.push(`<title>${metaData.title}</title>`);
    tags.push(`<meta name="title" content="${metaData.title}">`);
    tags.push(`<meta name="description" content="${metaData.description}">`);
    tags.push(`<meta name="keywords" content="${metaData.keywords}">`);
    tags.push(`<meta name="author" content="${metaData.author}">`);
    tags.push(`<meta name="robots" content="${metaData.robots}">`);
    tags.push(
      `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    );
    tags.push(`<meta charset="UTF-8">`);

    // Canonical URL
    tags.push(`\n<!-- Canonical URL -->`);
    tags.push(`<link rel="canonical" href="${metaData.url}">`);

    // Open Graph / Facebook Meta Tags
    tags.push(`\n<!-- Open Graph / Facebook -->`);
    tags.push(`<meta property="og:type" content="${metaData.ogType}">`);
    tags.push(`<meta property="og:url" content="${metaData.url}">`);
    tags.push(`<meta property="og:title" content="${metaData.title}">`);
    tags.push(
      `<meta property="og:description" content="${metaData.description}">`
    );
    tags.push(`<meta property="og:image" content="${metaData.image}">`);
    tags.push(`<meta property="og:site_name" content="${metaData.siteName}">`);
    tags.push(`<meta property="og:locale" content="${metaData.locale}">`);

    // Twitter Meta Tags
    tags.push(`\n<!-- Twitter -->`);
    tags.push(
      `<meta property="twitter:card" content="${metaData.twitterCard}">`
    );
    tags.push(`<meta property="twitter:url" content="${metaData.url}">`);
    tags.push(`<meta property="twitter:title" content="${metaData.title}">`);
    tags.push(
      `<meta property="twitter:description" content="${metaData.description}">`
    );
    tags.push(`<meta property="twitter:image" content="${metaData.image}">`);

    return tags.join("\n");
  }, [metaData]);

  const generatedTags = useMemo(() => generateMetaTags(), [generateMetaTags]);

  const handleFieldChange = useCallback(
    (field: keyof MetaTagData, value: string) => {
      setMetaData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const copyTags = useCallback(() => {
    toolState.actions.copyText(generatedTags, "Meta tags copied to clipboard!");
  }, [generatedTags, toolState.actions]);

  const downloadTags = useCallback(() => {
    const blob = new Blob([generatedTags], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meta-tags-webtoolseasy.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toolState.actions.showMessage("Meta tags downloaded!");
  }, [generatedTags, toolState.actions]);

  const buttons = [
    {
      type: "custom" as const,
      text: "Copy Meta Tags",
      icon: <ContentCopyIcon />,
      onClick: copyTags,
      variant: "contained" as const,
    },
    {
      type: "custom" as const,
      text: "Download HTML",
      icon: <DownloadIcon />,
      onClick: downloadTags,
      variant: "outlined" as const,
    },
  ];

  const ogTypes = [
    "website",
    "article",
    "blog",
    "product",
    "book",
    "profile",
    "video.movie",
    "video.tv_show",
    "music.song",
  ];

  const twitterCardTypes = ["summary", "summary_large_image", "app", "player"];

  const robotsOptions = [
    "index, follow",
    "noindex, follow",
    "index, nofollow",
    "noindex, nofollow",
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
        title="Free Meta Tag Generator"
        description="Generate SEO-optimized meta tags including Open Graph and Twitter Card tags for better search rankings and social media sharing."
        exampleCode="Fill in your page information → Generate tags → Copy to HTML"
        exampleOutput="Complete HTML meta tags ready to use"
      />

      <ToolControls buttons={buttons} />

      <div className="flex flex-col md:flex-row gap-4">
        {/* Input Panel */}
        <Card className="w-full md:w-1/2">
          <CardContent className="flex flex-col gap-4">
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
            >
              <Tab label="Basic Info" />
              <Tab label="Social Media" />
              <Tab label="Advanced" />
            </Tabs>

            {activeTab === 0 && (
              <div className="flex flex-col gap-3 mt-2">
                <Typography variant="h6" className="font-semibold">
                  Basic Information
                </Typography>

                <TextField
                  label="Page Title"
                  value={metaData.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  fullWidth
                  size="small"
                  helperText={`${metaData.title.length} characters (recommended: 50-60)`}
                />

                <TextField
                  label="Meta Description"
                  value={metaData.description}
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  helperText={`${metaData.description.length} characters (recommended: 150-160)`}
                />

                <TextField
                  label="Keywords (comma-separated)"
                  value={metaData.keywords}
                  onChange={(e) =>
                    handleFieldChange("keywords", e.target.value)
                  }
                  fullWidth
                  size="small"
                  helperText="Separate keywords with commas"
                />

                <TextField
                  label="Author"
                  value={metaData.author}
                  onChange={(e) => handleFieldChange("author", e.target.value)}
                  fullWidth
                  size="small"
                />

                <TextField
                  label="Canonical URL"
                  value={metaData.url}
                  onChange={(e) => handleFieldChange("url", e.target.value)}
                  fullWidth
                  size="small"
                  helperText="Full URL including https://"
                />
              </div>
            )}

            {activeTab === 1 && (
              <div className="flex flex-col gap-3 mt-2">
                <Typography variant="h6" className="font-semibold">
                  Social Media Settings
                </Typography>

                <TextField
                  label="Site Name"
                  value={metaData.siteName}
                  onChange={(e) =>
                    handleFieldChange("siteName", e.target.value)
                  }
                  fullWidth
                  size="small"
                  helperText="Your website or brand name"
                />

                <TextField
                  label="Featured Image URL"
                  value={metaData.image}
                  onChange={(e) => handleFieldChange("image", e.target.value)}
                  fullWidth
                  size="small"
                  helperText="Recommended: 1200x630px for optimal display"
                />

                <FormControl fullWidth size="small">
                  <InputLabel>Open Graph Type</InputLabel>
                  <Select
                    value={metaData.ogType}
                    label="Open Graph Type"
                    onChange={(e) =>
                      handleFieldChange("ogType", e.target.value)
                    }
                  >
                    {ogTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Twitter Card Type</InputLabel>
                  <Select
                    value={metaData.twitterCard}
                    label="Twitter Card Type"
                    onChange={(e) =>
                      handleFieldChange("twitterCard", e.target.value)
                    }
                  >
                    {twitterCardTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {metaData.image && (
                  <div className="mt-2">
                    <Typography variant="body2" className="mb-2">
                      Image Preview:
                    </Typography>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={metaData.image}
                      alt="Featured"
                      className="w-full h-auto rounded border border-gray-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 2 && (
              <div className="flex flex-col gap-3 mt-2">
                <Typography variant="h6" className="font-semibold">
                  Advanced Settings
                </Typography>

                <FormControl fullWidth size="small">
                  <InputLabel>Robots Meta Tag</InputLabel>
                  <Select
                    value={metaData.robots}
                    label="Robots Meta Tag"
                    onChange={(e) =>
                      handleFieldChange("robots", e.target.value)
                    }
                  >
                    {robotsOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Locale"
                  value={metaData.locale}
                  onChange={(e) => handleFieldChange("locale", e.target.value)}
                  fullWidth
                  size="small"
                  helperText="e.g., en_US, es_ES, fr_FR"
                />

                <Card variant="outlined" className="mt-2">
                  <CardContent>
                    <Typography variant="body2" className="font-semibold mb-2">
                      Robots Tag Explained:
                    </Typography>
                    <Typography variant="body2" className="text-sm">
                      • <strong>index, follow</strong>: Allow indexing and
                      following links (default)
                      <br />• <strong>noindex, follow</strong>: Don&apos;t index
                      but follow links
                      <br />• <strong>index, nofollow</strong>: Index page but
                      don&apos;t follow links
                      <br />• <strong>noindex, nofollow</strong>: Don&apos;t
                      index or follow links
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card className="w-full md:w-1/2">
          <CardContent className="flex flex-col gap-4">
            <Typography variant="h6" className="font-semibold">
              Generated Meta Tags
            </Typography>

            <div className="bg-gray-50 p-4 rounded border border-gray-300 overflow-auto max-h-[600px]">
              <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                {generatedTags}
              </pre>
            </div>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2" className="font-semibold mb-2">
                  How to use these meta tags:
                </Typography>
                <Typography variant="body2" className="text-sm">
                  1. Copy the generated meta tags above
                  <br />
                  2. Open your HTML file
                  <br />
                  3. Paste the tags inside the <code>&lt;head&gt;</code> section
                  <br />
                  4. Save and publish your page
                  <br />
                  5. Test with Facebook Debugger and Twitter Card Validator
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
