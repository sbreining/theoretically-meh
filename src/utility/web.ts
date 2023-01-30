
export enum HTTP_CODE { NO_CONTENT = 204 };

/**
 * Builds the URL paramters.
 *
 * @param {Record<string, string>} params - Object with {param_name: param_val}
 * @returns {string} - The url params joined by `&`
 */
export function buildUrlParams(params: Record<string, string>): string {
  let str = '';
  for (const [key, value] of Object.entries(params)) {
    str += `&${key}=${value}`;
  }

  // Remove the first `&` from the url string.
  return str.slice(1);
}
