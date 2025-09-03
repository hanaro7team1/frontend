import { createContext, useContext, useMemo, useReducer } from 'react';
import { makeInitial, reducer } from '@/utils/stays/stays';
import { WizardDataContext } from '@/types/wizard';

const WizardCtx = createContext<WizardDataContext | null>(null);

export default function WizardDataProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(reducer, undefined, makeInitial);
  const value = useMemo(() => ({ data, dispatch }), [data]);
  return <WizardCtx.Provider value={value}>{children}</WizardCtx.Provider>;
}

export const useWizardData = () => {
  const v = useContext(WizardCtx);
  if (!v) throw new Error('useWizardData는 WizardDataProvider 안에서 사용하세요');
  return v;
};
