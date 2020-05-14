import { render } from "@testing-library/react";
import React from "react";
import { SignUpFormData } from "../../../entities/SignUpFormData";
import logger from "../../../logger";
import DoneStep from "../Done";

jest.mock("../../../logger");

const mockFormData: SignUpFormData = {
  user: {
    name: "Ben Holland",
    email: "benholland99@gmail.com",
    password: "****************",
    role: "Your New Frontend Software Engineer 😁",
  },
  privacy: {
    updatesByEmail: false,
    updatesFromOtherProducts: false,
  },
};

describe("DoneStep", () => {
  test("renders a done message", () => {
    const { getByText } = render(
      <DoneStep
        stepperData={mockFormData}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );
    const messageElement = getByText(/All done!/);
    expect(messageElement).toBeInTheDocument();
  });

  test("logs the form data", () => {
    render(
      <DoneStep
        stepperData={mockFormData}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(logger.info).toHaveBeenCalledWith(mockFormData);
  });
});
