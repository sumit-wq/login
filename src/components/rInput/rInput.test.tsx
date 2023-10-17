import {describe, expect, test} from 'vitest';
import { render, screen } from "@testing-library/react";
import {RInput} from "./index";

describe("RInput Component", () => {
  test("renders input with specified type", () => {
    render(<RInput name="email" label="Name" value="" onChange={() => {}} type="email" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.getAttribute('type')).toBe('email');
  });

  test("renders input with specified placeholder", () => {
    render(<RInput name="name" label="Name" value="" onChange={() => {}} placeholder="Enter your name" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.getAttribute('placeholder')).toBe('Enter your name');

  });

  test("renders input with specified iad", () => {
    render(<RInput name="name" label="Name" value="" onChange={() => {}} id="myInput" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.getAttribute('id')).toBe('myInput');

  });

  test("renders input with specified data-testid", () => {
    render(<RInput name="name" label="Name" value="" onChange={() => {}} dataTestId="myInput" />);
    const inputElement = screen.getByTestId("myInput");
    expect(inputElement).toBeDefined();
  });

  test("renders input as required", () => {
    render(<RInput name="name" label="Name" value="" onChange={() => {}} required />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement.hasAttribute('required')).toBe(true);
  });
});
