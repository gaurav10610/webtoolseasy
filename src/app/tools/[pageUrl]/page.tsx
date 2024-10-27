export default function WebToolPage({
  params,
}: Readonly<{ params: { [key: string]: string } }>) {
  console.log(params.pageUrl);
  return (
    <div className="column-display base-flex-gap full-width">
      <h1>Web Tool Page</h1>
    </div>
  );
}
