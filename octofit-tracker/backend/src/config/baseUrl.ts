export function getApiBaseUrl(port: number): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${port}.app.github.dev`;
  }

  return `http://localhost:${port}`;
}
