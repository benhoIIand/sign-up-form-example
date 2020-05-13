import React, { ChangeEvent } from 'react';
import { SignUpFormData } from '../../entities/SignUpFormData';
import ActionBar from '../ActionBar';
import { StepComponent } from '../../entities/Step';

const UserStep: StepComponent<SignUpFormData> = ({ formData, onChange, onSubmit }) => {
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
};

export default UserStep;
