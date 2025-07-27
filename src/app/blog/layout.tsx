import { BaseToolsAds } from "@/components/baseAds";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full px-2 py-4">
      {/* Desktop Layout with 60% restriction */}
      <div className="hidden md:flex w-full max-w-none">
        {/* Left sidebar - 20% */}
        <div className="w-[20%] pr-2">
          <BaseToolsAds className="w-full" />
        </div>

        {/* Main content area - 60% */}
        <div className="w-[60%] px-2">{children}</div>

        {/* Right sidebar - 20% */}
        <div className="w-[20%] pl-2">
          <BaseToolsAds className="w-full" />
        </div>
      </div>

      {/* Mobile Layout - Full width */}
      <div className="flex md:hidden flex-col w-full">
        {children}
        <BaseToolsAds className="w-full mt-4" />
      </div>
    </div>
  );
}
