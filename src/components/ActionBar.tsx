import React from "react";

const ActionBar: React.FC<{
  continueEnabled: boolean;
  onContinue: Function;
}> = ({ continueEnabled, onContinue }) => {
  return (
    <div className="conditional-stepper_action-bar">
      <button
        disabled={!continueEnabled}
        onClick={() => onContinue()}
        data-testid="action-bar_continue-button"
      >
        Continue
      </button>
    </div>
  );
};

export default ActionBar;
