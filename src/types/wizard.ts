export type BeforeNextFn = () => boolean | void | Promise<boolean | void>;

export type WizardContext = {
  registerBeforeNext: (step: number, fn?: BeforeNextFn) => () => void;
  currentStep: number;
  goToStep: (n: number) => void;
  isNextDisable: boolean;
  setNextDisabled: (step: number, ready: boolean) => void;
  tryProceed: () => Promise<boolean>;
};

export type WizardDataContext = { data: WizardData; dispatch: React.Dispatch<WizardActions> };

//각 스텝별 데이터 타입

export type Step2Item = {
  id: string;
  file?: File; // 선택 직후엔 있음
  blobUrl?: string; // objectURL
  s3Key?: string; // 업로드 완료 후 채워짐
};

export type Step1 = { address: string; detailAddress: string };
export type Step2 = { items: Step2Item[] };
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
  | { type: 'RESET' }
  | { type: 'STEP2_ADD_FILES'; payload: { files: File[] } } // 파일 선택(append)
  | { type: 'STEP2_COMMIT_KEYS'; payload: { pairs: { id: string; s3Key: string }[] } } // 업로드 결과 매핑
  | { type: 'STEP2_REMOVE_ITEM'; payload: { id: string } } // X 삭제
  | { type: 'STEP2_CLEAR' };
