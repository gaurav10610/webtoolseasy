import { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

type AppLayoutProps = {
  children: ReactNode;
  mainClassName?: string;
  showFooter?: boolean;
  fullWidth?: boolean;
};

export function AppLayout({
  children,
  mainClassName,
  showFooter = true,
  fullWidth = false,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <Nav />
      <main className={cn("flex-1", mainClassName)}>
        <div
          className={cn(
            "h-full",
            !fullWidth && "mx-auto w-full max-w-7xl px-6 py-12"
          )}
        >
          {children}
        </div>
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
}
