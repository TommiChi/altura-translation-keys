export function http<T>(url: string, options: RequestInit = {}): Promise<T> {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers || {},
    },
  }).then(async response => {
    if (!response.ok) {
      return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
    }
    return await response.json();
  });
}