import React, { ChangeEvent } from "react";
import { SignUpFormData } from '../../entities/SignUpFormData';
import ActionBar from "../ActionBar";
import { StepComponent } from "../../entities/Step";

const PrivacyStep: StepComponent<SignUpFormData> = ({ stepperData, onChange, onSubmit }) => {
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
          {/* TODO: Convert these to use the FormField component /*/}
          <label htmlFor="updatesByEmail">
            Receive updates about Tray.io product by email
          </label>
          <input
            type="checkbox"
            id="updatesByEmail"
            name="updatesByEmail"
            checked={stepperData.privacy.updatesByEmail}
            onChange={setValue}
            data-testid="privacy_updatesByEmail"
          />
        </div>
        <div>
          <label htmlFor="updatesFromOtherProducts">
            Receive communication by email for other products created by the
            Tray.io team
          </label>
          <input
            type="checkbox"
            id="updatesFromOtherProducts"
            name="updatesFromOtherProducts"
            checked={stepperData.privacy.updatesFromOtherProducts}
            onChange={setValue}
            data-testid="privacy_updatesFromOtherProducts"
          />
        </div>
      </div>
      <ActionBar
        continueEnabled={isValid}
        onContinue={onSubmit}
      />
    </div>
  );
};
export default PrivacyStep;
