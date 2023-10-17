import { test, expect, describe } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import useApi from "./index";
import {  mockFetch } from "./mock";

globalThis.fetch = mockFetch;
describe('App Component', () => {
test("useApi initializes with correct state", () => {
  const { result } = renderHook(() => useApi());

  const { loading, error, postData } = result.current;

  expect(loading).toBe(false);
  expect(error).toBe(null);
  expect(typeof postData).toBe("function");
});

test("useApi handles successful post request", async () => {
  const { result } = renderHook(() => useApi());

  const { postData } = result.current;

  const data = { someData: "example" };
  const url = "/example-endpoint";

  const response = await postData(url, data);

  expect(response).toEqual({ success: true });
});
})
