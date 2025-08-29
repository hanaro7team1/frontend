export type BeforeNextFn = () => boolean | void | Promise<boolean | void>;

export type WizardContext = {
  registerBeforeNext: (step: number, fn?: BeforeNextFn) => () => void;
  currentStep: number;
  goToStep: (n: number) => void;
};
