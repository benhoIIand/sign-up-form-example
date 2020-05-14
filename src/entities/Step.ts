import React from "react";

type ValueOf<T> = T[keyof T];

export type PartialFormDataChange<D> = Partial<ValueOf<D>>;

export type StepComponent<D> = React.FC<{
  stepperData: D;
  onChange: (data: PartialFormDataChange<D>) => void;
  onSubmit: (msg: string) => void;
}>;

export interface Step<D, T> {
  key: keyof D | null;
  title: string;
  defaultValues: T;
  Component: StepComponent<D>;
}
