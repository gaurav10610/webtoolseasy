import { BaseToolsAds } from "@/components/baseAds";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full h-full overflow-y-auto pb-2">
      <BaseToolsAds className="w-full md:w-[20%]" />
      {children}
      <BaseToolsAds className="w-full md:w-[20%]" />
    </div>
  );
}
