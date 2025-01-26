import { isMobileDevice } from "@/lib/server-responsive";

export async function BaseToolsAds() {
  const isMobile = isMobileDevice();

  return (
    <div
      style={{
        // backgroundColor: "lightgrey",
        width: isMobile ? "100%" : "15%",
      }}
    >
      {/* This is the div for google ads */}
    </div>
  );
}
