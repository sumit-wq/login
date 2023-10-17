import { useState } from "react";
import { BASE_URL } from "../../constants/endpoints";
export type ApiError = {
  message?: string | null;
};


const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const postData = async (
    url: string, 
    data: any,
    headers: Record<string, string> = {} 
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = (await response?.json()) ?? {};

      if (!response?.ok) {
        throw new Error(result?.error ?? "Something went wrong");
      }

      return result;
    } catch (err: any) {
      setError(err);
      throw new Error(err ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, postData };
};

export default useApi;
