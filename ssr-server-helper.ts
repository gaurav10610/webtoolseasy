import { ServerResponse } from 'http';

const appHeaders: any = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

/**
 * add response headers
 * @param res
 */
export function addResponseHeaders(res: ServerResponse) {
  Object.keys(appHeaders).forEach(headerName =>
    res.setHeader(headerName, appHeaders[headerName])
  );
}
