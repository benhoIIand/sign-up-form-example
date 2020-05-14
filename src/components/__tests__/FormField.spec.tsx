import { fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import React from "react";
import FormField from "../FormField";

describe("FormField", () => {
  test("shows an asterisk in the label if the field is required", async () => {
    const { getByTestId } = render(
      <FormField
        label="Name"
        required={true}
        inputProps={{
          type: "text",
          id: "name",
          name: "name",
          value: "Ben Holland",
          onChange: () => {},
        }}
      />
    );

    expect(getByTestId("form-field_label_name")).toHaveTextContent("Name *");
  });

  test("shows does not show the error message until the user has blurred from the input", async () => {
    const { getByTestId, queryByTestId } = render(
      <FormField
        label="Name"
        required={true}
        errorMessage="This is an error message!"
        inputProps={{
          type: "text",
          id: "name",
          name: "name",
          value: "Ben Holland",
          onChange: () => {},
        }}
      />
    );

    expect(queryByTestId("form-field_error_name")).toBeNull();

    fireEvent.blur(getByTestId("form-field_input_name"));

    expect(getByTestId("form-field_error_name")).toHaveTextContent(
      /^This is an error message!$/
    );
  });
});
