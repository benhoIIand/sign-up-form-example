import React from "react";
import { SignUpFormData } from "../../entities/SignUpFormData";
import { StepComponent } from "../../entities/Step";
import logger from "../../logger";

const DoneStep: StepComponent<SignUpFormData> = ({ formData }) => {
  logger.info(formData);

  return (
    <div>
      <b>All done!</b>
    </div>
  );
};

export default DoneStep;
