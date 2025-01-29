export async function BaseToolsAds({
  className = "",
}: Readonly<{ className?: string }>) {
  return <div className={`max-h-20 ${className}`}></div>;
}
