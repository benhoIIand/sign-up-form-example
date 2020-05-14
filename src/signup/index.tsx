import React from "react";
import ConditionalStepper from "../components/ConditionalStepper";
import { PrivacyPreferences } from "../entities/PrivacyPreferences";
import { SignUpFormData } from "../entities/SignUpFormData";
import { Step } from "../entities/Step";
import { UserToCreate } from "../entities/User";
import DoneStep from "./steps/Done";
import PrivacyStep from "./steps/Privacy";
import UserStep from "./steps/User";

const userStep: Step<SignUpFormData, UserToCreate> = {
  key: "user",
  title: "User",
  defaultValues: { name: "", email: "", password: "", role: undefined },
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

const SignUp: React.FC = () => {
  return <div className="signup-form">
    <ConditionalStepper steps={[userStep, privacyStep, doneStep]} />
  </div>;
};

export default SignUp;
