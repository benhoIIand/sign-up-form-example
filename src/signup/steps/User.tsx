import React, { ChangeEvent } from "react";
import ActionBar from "../../components/ActionBar";
import { ConditionalStepperContent } from "../../components/ConditionalStepper";
import FormField from "../../components/FormField";
import { SignUpFormData } from "../../entities/SignUpFormData";
import { StepComponent } from "../../entities/Step";
import { UserToCreate, validationSchema } from "../../entities/User";
import createValidator from "../../utils/validation";

const validate = createValidator(validationSchema);

const UserStep: StepComponent<SignUpFormData> = ({
  stepperData,
  onChange,
  onSubmit,
}) => {
  const { user } = stepperData;
  const errors = validate<UserToCreate>(user);
  const isValid = errors === undefined;

  const setValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    onChange({
      [target.name]: target.value,
    });
  };

  // TODO: Ideally use `react-final-form` here, but didn't seem necessary for this test
  return (
    <>
      <ConditionalStepperContent>
        <FormField
          label="Name"
          required={true}
          errorMessage={errors?.name}
          inputProps={{
            type: "text",
            id: "name",
            name: "name",
            value: user.name,
            onChange: setValue,
          }}
        />
        <FormField
          label="Role"
          required={false}
          errorMessage={errors?.role}
          inputProps={{
            type: "text",
            id: "role",
            name: "role",
            value: user.role,
            onChange: setValue,
          }}
        />
        <FormField
          label="Email"
          required={true}
          errorMessage={errors?.email}
          inputProps={{
            type: "text",
            id: "email",
            name: "email",
            value: user.email,
            onChange: setValue,
          }}
        />
        <FormField
          label="Password"
          required={true}
          errorMessage={errors?.password}
          inputProps={{
            type: "password",
            id: "password",
            name: "password",
            value: user.password,
            onChange: setValue,
          }}
        />
      </ConditionalStepperContent>
      <ActionBar continueEnabled={isValid} onContinue={onSubmit} />
    </>
  );
};

export default UserStep;
