import React, { ChangeEvent } from "react";
import ActionBar from "../../components/ActionBar";
import { ConditionalStepperContent } from "../../components/ConditionalStepper";
import { SignUpFormData } from "../../entities/SignUpFormData";
import { StepComponent } from "../../entities/Step";

const PrivacyStep: StepComponent<SignUpFormData> = ({
  stepperData,
  onChange,
  onSubmit,
}) => {
  const isValid = true;

  const setValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    onChange({
      [target.name]: event.target.checked,
    });
  };

  return (
    <>
      <ConditionalStepperContent>
        <div>
          {/* TODO: Convert these to use the FormField component /*/}
          <input
            type="checkbox"
            id="updatesByEmail"
            name="updatesByEmail"
            checked={stepperData.privacy.updatesByEmail}
            onChange={setValue}
            data-testid="privacy_updatesByEmail"
          />
          <label htmlFor="updatesByEmail">
            Receive updates about Tray.io product by email
          </label>
        </div>
        {/* TODO: Sorry about this - needed spacing in a quick way */}
        <br />
        <div>
          <input
            type="checkbox"
            id="updatesFromOtherProducts"
            name="updatesFromOtherProducts"
            checked={stepperData.privacy.updatesFromOtherProducts}
            onChange={setValue}
            data-testid="privacy_updatesFromOtherProducts"
          />
          <label htmlFor="updatesFromOtherProducts">
            Receive communication by email for other products created by the
            Tray.io team
          </label>
        </div>
      </ConditionalStepperContent>
      <ActionBar continueEnabled={isValid} onContinue={onSubmit} />
    </>
  );
};
export default PrivacyStep;
