import React from "react";
import { SignUpFormData } from '../../entities/SignUpFormData';
import { StepComponent } from "../../entities/Step";

const DoneStep: StepComponent<SignUpFormData> = ({ formData }) => {
  console.log(formData);

  return (
    <div>
      <b>All done!</b>
    </div>
  );
};

export default DoneStep;
