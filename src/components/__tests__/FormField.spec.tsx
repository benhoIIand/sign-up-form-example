import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Form from "../Form";

describe("Form", () => {
  test("sets a form value as dirty", async () => {
    const { getByRole, getByTestId } = render(
      <Form
        render={({ formState, setAsDirty }) => (
          <div>
            <pre data-testid="output">{JSON.stringify(formState)}</pre>
            <button onClick={() => setAsDirty("button")}>Dirtify</button>
          </div>
        )}
      />
    );

    const button = getByRole("button");
    const output = getByTestId("output");

    expect(output).toHaveTextContent(JSON.stringify({}));

    fireEvent.click(button);

    expect(output).toHaveTextContent(
      JSON.stringify({ button: { dirty: true } })
    );
  });
});
