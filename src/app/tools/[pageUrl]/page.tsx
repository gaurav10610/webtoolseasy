import dynamic from "next/dynamic";

export default function WebToolPage({
  params,
}: Readonly<{ params: { [key: string]: string } }>) {
  const ToolComponent = dynamic(
    () => import(`@/components/tools/${params.pageUrl}.tsx`),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    }
  );
  return <ToolComponent />;
}
