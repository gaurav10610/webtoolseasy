import { CircularLoader } from "@/components/lib/loaders";
import dynamic from "next/dynamic";

export default function WebToolPage({
  params,
}: Readonly<{ params: { [key: string]: string } }>) {
  const ToolComponent = dynamic(
    () => import(`@/components/tools/${params.pageUrl}.tsx`),
    {
      loading: () => CircularLoader({ color: "secondary" }),
      ssr: false,
    }
  );
  return <ToolComponent />;
}
