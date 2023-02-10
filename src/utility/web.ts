
export enum HTTP_CODE { NO_CONTENT = 204 };

/**
 * Builds the URL paramters.
 *
 * @param {Record<string, any>} params - Object with {param_name: param_val}
 * @returns {string} - The url params joined by `&`
 */
export function buildUrlParams(params: Record<string, any>): string {
  return Object.entries(params)
    .map((([key, val]) => `${key}=${val}`))
    .join('&');
}
