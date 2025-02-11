/**
 * Retrieves the json data from the data folder based on the relativeFilePath
 * @param relativeFilePath - the relative file path of the json file
 * @returns json data
 *
 */
export async function getJsonData(relativeFilePath: string) {
  try {
    const jsonData = await import(`@/data/${relativeFilePath}.json`);
    return jsonData.default;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(`Error fetching data for file: ${relativeFilePath}`);
    return null;
  }
}

export async function postDataFile({
  httpMethod = "POST",
  url = "http://localhost:3000/api/file-data",
  data,
}: Readonly<{
  httpMethod?: string;
  url?: string;
  data: unknown;
}>) {
  const response = await fetch(url, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}
