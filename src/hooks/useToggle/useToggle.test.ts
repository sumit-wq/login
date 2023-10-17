import { test, expect } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import useToggle from "./index";

test("useToggle initializes with correct value", () => {
  const { result } = renderHook(() => useToggle(true));
  expect(result.current.value).toBe(true);
});

test("useToggle toggle function switches value", () => {
  const { result } = renderHook(() => useToggle(true));
  const { toggle } = result.current;

  toggle();
  expect(result.current.value).toBe(false);

  toggle();
  expect(result.current.value).toBe(true);
});
