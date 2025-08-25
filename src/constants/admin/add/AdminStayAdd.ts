import AddAdress from '@/components/domain/add/steps/Step1';
import AddPhoto from '@/components/domain/add/steps/Step2';
import AddCapacity from '@/components/domain/add/steps/Step3';
import AddInfo from '@/components/domain/add/steps/Step4';
import AddDescription from '@/components/domain/add/steps/Step5';

export const FIRST_STEP_NUM = 1;
export const TOTAL_STEP_NUM = 5;

export const STEPS = [AddAdress, AddPhoto, AddCapacity, AddInfo, AddDescription] as const;
