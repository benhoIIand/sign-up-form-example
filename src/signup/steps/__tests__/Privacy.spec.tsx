import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";
import { SignUpFormData } from "../../../entities/SignUpFormData";
import UserStep from "../User";

const mockFormData: SignUpFormData = {
  user: {
    name: "Ben Holland",
    email: "benholland99@gmail.com",
    password: "abcdefGHI123",
    role: "Your New Frontend Software Engineer 😁",
  },
  privacy: {
    updatesByEmail: false,
    updatesFromOtherProducts: false,
  },
};

const ACTION_BAR_CONTINUE_BUTTON_SELECTOR = "action-bar_continue-button";

describe("PrivacyStep", () => {
  describe("when the form is valid", () => {
    test("the continue button is enabled", () => {
      const { getByTestId } = render(
        <UserStep
          stepperData={mockFormData}
          onChange={() => {}}
          onSubmit={() => {}}
        />
      );
      const continueButton = getByTestId(ACTION_BAR_CONTINUE_BUTTON_SELECTOR);

      expect(continueButton).toBeEnabled();
    });

    describe("and the continue button is clicked", () => {
      test("the onSubmit callback is called", () => {
        const onSubmitSpy = jest.fn();
        const { getByTestId } = render(
          <UserStep
            stepperData={mockFormData}
            onChange={() => {}}
            onSubmit={onSubmitSpy}
          />
        );
        const continueButton = getByTestId(ACTION_BAR_CONTINUE_BUTTON_SELECTOR);

        fireEvent.click(continueButton);

        expect(onSubmitSpy).toHaveBeenCalled();
      });
    });
  });
});
