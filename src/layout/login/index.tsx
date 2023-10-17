import React, { ChangeEvent, useState } from "react";
import { RInput } from "../../components/rInput";
import { ApiError } from "../../hooks/useApi";
import "../../App.css";

export interface ILogin {
  handleSubmit: (formData: IFormData) => void;
  error: ApiError | null;
}

export interface IFormData {
  email: string;
  password: string;
}

export interface IFormDataError {
  email?: string;
  password?: string;
}

const Login: React.FC<ILogin> = ({ handleSubmit, error }) => {
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<IFormDataError>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      handleValidation(value, emailValidator, name);
    } else if (name === "password") {
      handleValidation(value, passwordValidator, name);
    }
  };

  const handleValidation = (
    value: string,
    validator: (value: string) => boolean,
    fieldName: string
  ) => {
    const errorMessage = validator(value)
      ? ""
      : `Please enter a valid ${fieldName}`;
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  };

  const emailValidator = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const passwordValidator = (value: string) => value.length > 0;

  const validateSubmit = (): void => {
    const validatedInputs = Object.entries(formData).map((item) => {
      handleValidation(
        item[1],
        item[0] === "email" ? emailValidator : passwordValidator,
        item[0]
      );
      return item[0] === "email"
        ? emailValidator(item[1])
        : passwordValidator(item[1]);
    });

    const isValid = !validatedInputs.some((item) => item === false);

    if (isValid) {
      handleSubmit(formData);
    }
  };

  return (
    <>
      <h1 className="heading">Login In</h1>
      {error && (
        <h3 className="error-msg ">
          {error?.message ?? "Something went wrong"}
        </h3>
      )}
      <RInput
        name="email"
        label={"Enter email id"}
        onChange={handleInputChange}
        error={errors.email}
        placeholder="Enter Email"
        dataTestId="emailInput"
        value={formData.email}
        wrapperClassName="input-box"
        className="input-field"
        type="text"
      />
      <RInput
        name="password"
        label={"Enter password "}
        onChange={handleInputChange}
        error={errors.password}
        placeholder="Enter password"
        dataTestId="passwordInput"
        value={formData.password}
        wrapperClassName="input-box"
        className="input-field"
        type="password"
        isPassword={true}
      />
      <div className="links">
        <a href="#">Forget Password</a>
        <a href="#">Sign Up</a>
      </div>

      <button className="button-submit" onClick={validateSubmit}>
        Submit
      </button>
    </>
  );
};

export { Login };
