import { ChangeEvent } from "react";
import "./styles.css";
import useToggle from "../../hooks/useToggle";

type IInputProps = {
  label: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  name: string;
  id?: string;
  dataTestId?: string;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
  isPassword?: boolean;
};

const RInput = (props: IInputProps) => {
  const { value: showPassword, toggle } = useToggle(false);
  const {
    label,
    value,
    error,
    onChange,
    type = "text",
    placeholder = "",
    name,
    id,
    dataTestId,
    required = false,
    className,
    wrapperClassName,
    isPassword,
  } = props;

  const getType = (): string => {
    if (isPassword && showPassword) {
      return "text";
    }
    return type;
  };

  return (
    <>
    <div
      className={`${isPassword && "lock-icon-wrapper"} ${wrapperClassName}`}
      data-testid={dataTestId}
    >
      <label htmlFor={name}>{label}</label>
      <input
        required={required}
        id={id}
        name={name}
        placeholder={placeholder}
        type={getType()}
        value={value}
        onChange={onChange}
        className={`${className} ${isPassword ? "input-lock-padding " : ""} ${
          Boolean(error) ? "border-error" : ""
        }`}
      />
      {isPassword && (
        <span className="lock-icon" onClick={toggle}>
          {showPassword ? "🔐" : "🔒"}
        </span>
      )}
    </div>
      {error && <span className="error-text">{error}</span>}
    </>
  );
};

export { RInput };
