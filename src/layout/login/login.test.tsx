import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Login, ILogin, IFormData } from "./index";

const mockHandleSubmit = vi.fn();

const mockLoginProps: ILogin = {
  handleSubmit: mockHandleSubmit,
  error: null,
};

const initialFormData: IFormData = {
  email: "",
  password: "",
};

describe("Login Component", () => {
  test("renders login form with initial state", () => {
    render(<Login {...mockLoginProps} />);
    const emailInput = screen.getByPlaceholderText(
      "Enter Email"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Enter password"
    ) as HTMLInputElement;
    const submitButton = screen.getByText("Submit") as HTMLButtonElement;

    expect(emailInput.value).toBe(initialFormData.email);
    expect(passwordInput.value).toBe(initialFormData.password);
    expect(submitButton).toBeTruthy();
  });

  test("displays error message for invalid email", () => {
    render(<Login {...mockLoginProps} />);
    const emailInput = screen.getByPlaceholderText(
      "Enter Email"
    ) as HTMLInputElement;
    const submitButton = screen.getByText("Submit") as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByText(
      "Please enter a valid email address"
    );
    expect(errorMessage).toBe(errorMessage);
  });

  test("displays error message for empty password", () => {
    render(<Login {...mockLoginProps} />);
    const passwordInput = screen.getByPlaceholderText(
      "Enter password"
    ) as HTMLInputElement;
    const submitButton = screen.getByText("Submit") as HTMLButtonElement;

    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByText("Please enter a password");
    expect(errorMessage).toBe(errorMessage);
  });

  test("submits form with valid input", () => {
    render(<Login {...mockLoginProps} />);
    const emailInput = screen.getByPlaceholderText(
      "Enter Email"
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "Enter password"
    ) as HTMLInputElement;
    const submitButton = screen.getByText("Submit") as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    expect(mockLoginProps.handleSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "testpassword",
    });
  });

  test("displays error message for empty email", () => {
    render(<Login {...mockLoginProps} />);

    const emailInput = screen.getByPlaceholderText(
      "Enter Email"
    ) as HTMLInputElement;
    const submitButton = screen.getByText("Submit") as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByText(
      "Please enter a valid email address"
    );
    expect(errorMessage).toBe(errorMessage);
  });
});
