import AddCapacity from '@/components/domain/add/steps/Step3';
import AddInfo from '@/components/domain/add/steps/Step4';
import AddDescription from '@/components/domain/add/steps/Step5';
import AddAdress from '@/components/domain/add/steps/step1/Step1';
import AddPhoto from '@/components/domain/add/steps/step2/Step2';

export const FIRST_STEP_NUM = 1;
export const TOTAL_STEP_NUM = 5;

export const STEPS = [AddAdress, AddPhoto, AddCapacity, AddInfo, AddDescription] as const;
