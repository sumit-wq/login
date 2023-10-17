import { render, cleanup, act } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import App from "./App";
import useApi from "./hooks/useApi";
import { renderHook } from "@testing-library/react-hooks";

describe("App Component", () => {
  afterEach(() => {
    cleanup();
  });
  test("renders the login form initially", async () => {
    const { queryByText } = render(<App />);

    expect(queryByText("Login In")).toBe(queryByText("Login In"));
    expect(queryByText("Logged In Component")).toBeNull();
  });

  const mockFetch = async (url: string, options: any) => {
    const response = {
      status: 200,
      ok: true,
      json: async () => ({ token: "token" }),
    };
    return Promise.resolve(response);
  };
  globalThis.fetch = mockFetch;
  test("handles API call correctly", async () => {
    const { queryByText } = render(<App />);
    const { result } = renderHook(() => useApi());

    const { postData } = result.current;

    const handleFormSubmit = async () => {
      const response = await postData("/endpoint", {
        email: "example@email.com",
        password: "password",
      });
      return response;
    };

    await act(async () => {
      const response = await handleFormSubmit();
      expect(response).toEqual({ token: "token" });
    });
  });
});
