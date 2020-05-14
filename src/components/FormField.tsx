import clsx from 'clsx';
import React, { useState } from 'react';

export interface FormField {
  label: string;
  required: boolean;
  errorMessage?: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

// TODO: Need to make sure that `inputProps.id` is passed
const FormField: React.FC<FormField> = ({
  label,
  required,
  errorMessage,
  inputProps,
}) => {
  const [dirty, setDirty] = useState(false);
  const showError = errorMessage && dirty;

  return (
    <div
      className={clsx("form-field", {
        "form-field--error": showError,
      })}
    >
      <label
        htmlFor={inputProps.id}
        data-testid={`form-field_label_${inputProps.id}`}
        className="form-field_label"
      >
        {`${label} ${required ? "*" : ""}`}
      </label>
      <input
        {...inputProps}
        value={inputProps.value || ""}
        onBlur={() => setDirty(true)}
        data-testid={`form-field_input_${inputProps.id}`}
        className="form-field_input"
      />
      {showError && (
        <p
          className="form-field_error-message"
          data-testid={`form-field_error_${inputProps.id}`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormField;
