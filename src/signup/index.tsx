import React, { useState } from "react";
import { PrivacyPreferences } from "../entities/PrivacyPreferences";
import { SignUpFormData } from "../entities/SignUpFormData";
import { PartialFormDataChange, Step } from "../entities/Step";
import { UserToCreate } from "../entities/User";
import DoneStep from "./steps/Done";
import PrivacyStep from "./steps/Privacy";
import UserStep from "./steps/User";

const userStep: Step<SignUpFormData, UserToCreate> = {
  key: "user",
  title: "User",
  defaultValues: { name: "", email: "", password: "" },
  Component: UserStep,
};

const privacyStep: Step<SignUpFormData, PrivacyPreferences> = {
  key: "privacy",
  title: "Privacy",
  defaultValues: { updatesByEmail: false, updatesFromOtherProducts: false },
  Component: PrivacyStep,
};

const doneStep: Step<SignUpFormData, null> = {
  key: null,
  title: "Done",
  defaultValues: null,
  Component: DoneStep,
};

const steps = [userStep, privacyStep, doneStep];

const defaultFormValues = () =>
  steps
    .filter((s) => s.defaultValues !== undefined)
    .reduce(
      (vals, s) => (s.key ? { ...vals, [s.key]: s.defaultValues } : vals),
      {}
    ) as SignUpFormData;

const SignUp: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState<SignUpFormData>(defaultFormValues);
  const activeStep = steps[activeStepIndex];
  const { key, Component } = activeStep;

  const nextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const updateFormData = (data: PartialFormDataChange<SignUpFormData>) => {
    if (!key) {
      console.error(
        "Trying to update formData without specifying a key for the current step"
      );
      return;
    }

    const newData = {
      ...formData,
      [key]: {
        ...formData[key],
        ...data,
      },
    };

    setFormData(newData);
  };

  return (
    <div>
      <div>
        <ul>
          {steps.map((step) => (
            <li key={step.title}>{step.title}</li>
          ))}
        </ul>

        <div>
          <Component
            formData={formData}
            onChange={updateFormData}
            onSubmit={nextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
