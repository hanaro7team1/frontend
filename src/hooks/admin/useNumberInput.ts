import { ChangeEvent, useMemo, useState } from 'react';

type UseNumberInputOptions = {
  allowDecimal?: boolean;
  min?: number;
};

export function useNumberInput(
  initial: number | null,
  { allowDecimal = false, min }: UseNumberInputOptions = {},
) {
  const [str, setStr] = useState(initial != null ? String(initial) : '');

  const parsed = useMemo(() => {
    const v = str.trim();
    if (!v) return null;
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    if (min != null && n < min) return null;
    if (!allowDecimal && !Number.isInteger(n)) return null;
    return n;
  }, [str, allowDecimal, min]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const pattern = allowDecimal ? /^\d*\.?\d*$/ : /^\d*$/;
    if (pattern.test(raw)) setStr(raw);
  };

  return { str, setStr, value: parsed, onChange };
}
