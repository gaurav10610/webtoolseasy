export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-full flex flex-col items-center">{children}</div>;
}
