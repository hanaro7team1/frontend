import AddAdress from '@/components/domain/admin/add/steps/step1/Step1';
import AddPhoto from '@/components/domain/admin/add/steps/step2/Step2';
import AddCapacity from '@/components/domain/admin/add/steps/step3/Step3';
import AddInfo from '@/components/domain/admin/add/steps/step4/Step4';
import AddDescription from '@/components/domain/admin/add/steps/step5/Step5';
import StayPreview from '@/components/domain/admin/add/steps/step6/Step6';

export const MAX_LENGTH = 1000;

export const SLOT_COUNT = 6;

export const FIRST_STEP_NUM = 1;

export const TOTAL_STEP_NUM = 6;

export const TOTAL_SIGN_UP_NUM = 2;

export const STEPS = [
  AddAdress,
  AddPhoto,
  AddCapacity,
  AddInfo,
  AddDescription,
  StayPreview,
] as const;
