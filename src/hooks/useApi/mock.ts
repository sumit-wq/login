export const BASE_URL = "http://example.com"; // Change this to your desired base URL

export const mockFetch = async (url: string, options: any) => {
  const response = { status: 200, ok: true, json: async () => ({ success: true }) };
  return Promise.resolve(response);
};
