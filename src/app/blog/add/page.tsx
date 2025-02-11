import AddBlogPageForm from "@/components/addBlogPageForm";
import { Container, Typography } from "@mui/material";

export default function AddBlogPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <Container className="flex flex-col gap-3 w-full items-center max-w-sm">
        <Typography variant="h4" color="error" align="center" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" align="center">
          The page you are looking for does not exist.
        </Typography>
      </Container>
    );
  }
  return <AddBlogPageForm />;
}
