import { FlexList } from "./lib/flexComponents";

export default function BaseToolsPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <FlexList isFullWidth={true} items={[children]} />;
}
