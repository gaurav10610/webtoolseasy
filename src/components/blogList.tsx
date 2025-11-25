import { BlogNavigationConfig } from "@/types/blog-config";
import { Typography, Card, CardContent, Chip, Box, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import { SocialShareButtons } from "./socialShareButtons";
import { H1Heading } from "./baseComponents/headings";
import { PageMetadata } from "@/components/baseComponents/pageMetadata";

const BlogOverviewListItem = ({
  blogPost,
}: Readonly<{
  blogPost: BlogNavigationConfig;
}>) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Link
          href={`/blog/${blogPost.slug}`}
          className="no-underline"
          style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Category and Featured Badge */}
          <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
            <Chip label={blogPost.category} color="primary" size="small" />
            {blogPost.isFeatured && (
              <Chip label="Featured" color="secondary" size="small" />
            )}
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            color="primary"
            gutterBottom
            sx={{
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {blogPost.title}
          </Typography>

          {/* Excerpt */}
          <Typography
            variant="body2"
            color="textSecondary"
            paragraph
            sx={{
              flexGrow: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {blogPost.excerpt}
          </Typography>

          {/* Footer: Author, Date, Reading Time */}
          <Box sx={{ mt: "auto", pt: 2, borderTop: "1px solid #e0e0e0" }}>
            <PageMetadata
              updatedBy={blogPost.author}
              updatedAt={blogPost.updatedAt}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: 1,
              }}
            >
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="caption" color="textSecondary">
                {blogPost.readingTimeMinutes} min read
              </Typography>
            </Box>
          </Box>
        </Link>
      </CardContent>
    </Card>
  );
};

export default async function BlogList({
  blogPosts,
}: Readonly<{ blogPosts: BlogNavigationConfig[] }>) {
  // Separate featured and regular posts
  const featuredPosts = blogPosts.filter((post) => post.isFeatured);
  const regularPosts = blogPosts.filter((post) => !post.isFeatured);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <H1Heading heading="Expert Guides for Online Web Tools & Technologies" />
        <Typography variant="h6" color="textSecondary" paragraph>
          Master the latest web development tools, security practices, and
          productivity techniques
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Dive into comprehensive tutorials covering JWT authentication, API
          security, modern frameworks, and powerful online tools that streamline
          your workflow.
        </Typography>
        <SocialShareButtons
          pageUrl={`${process.env.HOSTNAME}/blog`}
          heading="WebToolsEasy Blog"
        />
      </Box>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            Featured Articles
          </Typography>
          <Grid container spacing={3}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} md={6} key={post.slug}>
                <BlogOverviewListItem blogPost={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* All Posts Section */}
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          {featuredPosts.length > 0 ? "All Articles" : "Latest Articles"}
        </Typography>
        <Grid container spacing={3}>
          {(featuredPosts.length > 0 ? regularPosts : blogPosts).map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.slug}>
              <BlogOverviewListItem blogPost={post} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Empty State */}
      {blogPosts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            No blog posts yet
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Check back soon for new content!
          </Typography>
        </Box>
      )}
    </div>
  );
}
