import EditBlogEntity from "@/components/editBlogEntity";
import { getJsonData } from "@/util/appDataUtils";
import { Container, Typography } from "@mui/material";
import { isNil } from "lodash-es";

export default async function EditBlogPage(
  props: Readonly<{
    params: Promise<{ [key: string]: string }>;
  }>
) {
  const { pageUrl } = await props.params;
  const jsonData = await getJsonData(`blog/${pageUrl}`);

  if (process.env.NODE_ENV === "production" || isNil(jsonData)) {
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

  return <EditBlogEntity blogEntity={jsonData} pageUrl={pageUrl} />;
}
