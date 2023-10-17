import { useState } from "react";

interface ToggleResult {
  value: boolean;
  toggle: () => void;
}

const useToggle = (initialValue: boolean): ToggleResult => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return { value, toggle };
};

export default useToggle;
