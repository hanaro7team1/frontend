import AddAdress from '@/components/domain/add/steps/step1/Step1';
import AddPhoto from '@/components/domain/add/steps/step2/Step2';
import AddCapacity from '@/components/domain/add/steps/step3/Step3';
import AddInfo from '@/components/domain/add/steps/step4/Step4';
import AddDescription from '@/components/domain/add/steps/step5/Step5';

export const FIRST_STEP_NUM = 1;
export const TOTAL_STEP_NUM = 5;

export const STEPS = [AddAdress, AddPhoto, AddCapacity, AddInfo, AddDescription] as const;
