const codespaceName = import.meta.env.VITE_CODESPACE_NAME as string | undefined;

/**
 * Base URL for all API calls.
 * Uses the GitHub Codespaces forwarded port URL when VITE_CODESPACE_NAME is set,
 * otherwise falls back to localhost for local development.
 */
const apiBase: string = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default apiBase;
