import Script from "next/script";

export const AdSense = ({ pId }: { pId: string }) => {
  if (process.env.NODE_ENV === "production") {
    return (
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    );
  }
  return null;
};
