import React, { useState } from "react";

export interface FormField {
  label: string;
  required: boolean;
  errorMessage?: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const FormField: React.FC<FormField> = ({
  label,
  required,
  errorMessage,
  inputProps,
}) => {
  const [dirty, setDirty] = useState(false);

  return (
    <div>
      <label htmlFor={inputProps.id}>
        {label}
        {required ? "*" : ""}
      </label>
      <input
        {...inputProps}
        value={inputProps.value || ""}
        onBlur={() => setDirty(true)}
      />
      {errorMessage && dirty && <p>{errorMessage}</p>}
    </div>
  );
};

export default FormField;
