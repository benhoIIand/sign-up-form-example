import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import logger from "../../logger";
import SignUp from "../index";

jest.mock("../../logger");

const ACTION_BAR_CONTINUE_BUTTON_SELECTOR = "action-bar_continue-button";

// Integration test for the form
describe("SignUp", () => {
  test("successfully filling in the form", () => {
    const { getByTestId } = render(<SignUp />);
    const getFormFieldInput = (id: string) =>
      getByTestId(`form-field_input_${id}`);

    // Fill in the user form
    fireEvent.change(getFormFieldInput("name"), {
      target: { value: "Ben Holland" },
    });
    fireEvent.change(getFormFieldInput("role"), {
      target: { value: "Your New Frontend Software Engineer 😁" },
    });
    fireEvent.change(getFormFieldInput("email"), {
      target: { value: "benholland99@gmail.com" },
    });
    fireEvent.change(getFormFieldInput("password"), {
      target: { value: "abcdefGHI123" },
    });

    // Click continue
    fireEvent.click(getByTestId(ACTION_BAR_CONTINUE_BUTTON_SELECTOR));

    // Select privacy preferences
    fireEvent.click(getByTestId("privacy_updatesFromOtherProducts"));

    // Click continue
    fireEvent.click(getByTestId(ACTION_BAR_CONTINUE_BUTTON_SELECTOR));

    // Expectations
    expect(logger.info).toHaveBeenCalledWith({
      user: {
        name: "Ben Holland",
        email: "benholland99@gmail.com",
        password: "abcdefGHI123",
        role: "Your New Frontend Software Engineer 😁",
      },
      privacy: {
        updatesByEmail: false,
        updatesFromOtherProducts: true,
      },
    });
  });

  test("validation errors are shown in the form", () => {
    const { getByTestId } = render(<SignUp />);
    const getFormFieldInput = (id: string) =>
      getByTestId(`form-field_input_${id}`);
    const getFormFieldError = (id: string) =>
      getByTestId(`form-field_error_${id}`);

    // Fill in the user form incorrectly
    fireEvent.change(getFormFieldInput("name"), {
      target: { value: "Ben Holland" },
    });
    fireEvent.change(getFormFieldInput("email"), {
      target: { value: "benholland99" },
    });
    fireEvent.blur(getFormFieldInput("email"));

    // Check the email error message is showing
    expect(getFormFieldError("email")).toHaveTextContent(
      /^"email" must be a valid email$/
    );
  });
});
