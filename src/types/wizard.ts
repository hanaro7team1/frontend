export type BeforeNextFn = () => boolean | void | Promise<boolean | void>;

export type WizardContext = {
  registerBeforeNext: (step: number, fn?: BeforeNextFn) => () => void;
  currentStep: number;
  goToStep: (n: number) => void;
  isNextDisable: boolean;
  setNextDisabled: (step: number, ready: boolean) => void;
  tryProceed: () => Promise<boolean>;
  finish: () => Promise<void>;
};

export type WizardDataContext = { data: WizardData; dispatch: React.Dispatch<WizardActions> };

//각 스텝별 데이터 타입
export type Step1 = { address: string; detailAddress: string };
export type Step2 = { s3Keys: string[] };
export type Step3 = { capacity: number; areaSize: number };
export type Step4 = { hostName: string; hostPhone: string };
export type Step5 = { description: string };

export type WizardData = {
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step4: Step4;
  step5: Step5;
};

export type WizardDataDispatch = React.Dispatch<WizardActions>;

//입력이 2개니까 바뀐 것만 보낼 수 있도록
export type WizardActions =
  | { type: 'SET_STEP1'; payload: Partial<Step1> }
  | { type: 'SET_STEP2'; payload: Partial<Step2> }
  | { type: 'SET_STEP3'; payload: Partial<Step3> }
  | { type: 'SET_STEP4'; payload: Partial<Step4> }
  | { type: 'SET_STEP5'; payload: Partial<Step5> }
  | { type: 'RESET' };
