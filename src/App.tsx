import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { UserToCreate } from "./entities/User";

type ValueOf<T> = T[keyof T];

interface PrivacyPreferences {
  updatesByEmail: boolean;
  updatesFromOtherProducts: boolean;
}

interface FormData {
  user: UserToCreate;
  privacy: PrivacyPreferences;
}

interface Step<T> {
  key: keyof FormData | null;
  title: string;
  defaultValues: T;
  Component: React.FC<{
    formData: FormData;
    onChange: (data: Partial<ValueOf<FormData>>) => void;
    onSubmit: (msg: string) => void;
  }>;
}

const ActionBar: React.FC<{
  continueEnabled: boolean;
  onContinue: Function;
}> = ({ continueEnabled, onContinue }) => {
  return (
    <button disabled={!continueEnabled} onClick={() => onContinue()}>
      Continue
    </button>
  );
};

const UserStep: Step<UserToCreate> = {
  title: "User",
  key: "user",
  defaultValues: { name: "", email: "", password: "" },
  Component: ({ formData, onChange, onSubmit }) => {
    const isValid = formData.user.name.length > 5;

    const setValue = (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      onChange({
        [target.name]: target.value,
      });
    };

    return (
      <div>
        <div>
          <b>User</b>
        </div>
        <div>
          <label htmlFor="users_name">Name *</label>
          <input
            type="text"
            id="users_name"
            name="name"
            value={formData.user.name}
            onChange={setValue}
          />
        </div>
        <ActionBar
          continueEnabled={isValid}
          onContinue={() => onSubmit("step 1")}
        />
      </div>
    );
  },
};

const PrivacyStep: Step<PrivacyPreferences> = {
  title: "Privacy",
  key: "privacy",
  defaultValues: { updatesByEmail: false, updatesFromOtherProducts: false },
  Component: ({ formData, onChange, onSubmit }) => {
    const isValid = true;

    const setValue = (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      onChange({
        [target.name]: event.target.checked,
      });
    };

    return (
      <div>
        <div>
          <b>Privacy</b>
        </div>
        <div>
          <div>
            <label htmlFor="privacy_updatesByEmail">
              Receive updates about Tray.io product by email
            </label>
            <input
              type="checkbox"
              id="privacy_updatesByEmail"
              name="updatesByEmail"
              checked={formData.privacy.updatesByEmail}
              onChange={setValue}
            />
          </div>
          <div>
            <label htmlFor="privacy_updatesFromOtherProducts">
              Receive communication by email for other products created by the
              Tray.io team
            </label>
            <input
              type="checkbox"
              id="privacy_updatesFromOtherProducts"
              name="updatesFromOtherProducts"
              checked={formData.privacy.updatesFromOtherProducts}
              onChange={setValue}
            />
          </div>
        </div>
        <ActionBar
          continueEnabled={isValid}
          onContinue={() => onSubmit("step 2")}
        />
      </div>
    );
  },
};

const Done: Step<null> = {
  key: null,
  title: "Done",
  defaultValues: null,
  Component: ({ formData }) => {
    console.log(formData);

    return (
      <div>
        <b>All done!</b>
      </div>
    );
  },
};

const steps = [UserStep, PrivacyStep, Done];

const defaultFormValues = () =>
  steps
    .filter((s) => s.defaultValues !== undefined)
    .reduce(
      (vals, s) => (s.key ? { ...vals, [s.key]: s.defaultValues } : vals),
      {}
    ) as FormData;

const App: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(defaultFormValues);
  const activeStep = steps[activeStepIndex];
  const { key, Component } = activeStep;

  const nextStep = () => {
    if (activeStepIndex < steps.length) {
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      console.log("Finished");
      console.log(formData);
    }
  };

  const updateFormData = (data: Partial<ValueOf<FormData>>) => {
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

    console.log("Previous", formData);
    console.log("Next", newData);

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

export default App;
