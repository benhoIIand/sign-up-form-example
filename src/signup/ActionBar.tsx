import React from "react";

const ActionBar: React.FC<{
  continueEnabled: boolean;
  onContinue: Function;
}> = ({ continueEnabled, onContinue }) => {
  return (
    <button disabled={!continueEnabled} onClick={() => onContinue()} data-testid="action-bar_continue-button">
      Continue
    </button>
  );
};

export default ActionBar;
