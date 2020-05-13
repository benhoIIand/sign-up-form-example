import React, { ChangeEvent } from "react";
import { SignUpFormData } from '../../entities/SignUpFormData';
import ActionBar from "../ActionBar";
import { StepComponent } from "../../entities/Step";

const PrivacyStep: StepComponent<SignUpFormData> = ({ formData, onChange, onSubmit }) => {
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
};
export default PrivacyStep;
