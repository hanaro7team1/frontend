import { Step2Item, WizardActions, WizardData } from '@/types/wizard';

/**
 * Date객체를 YY.MM.DD 형태로 format해주는 함수
 * @param date : Date 객체
 * @returns YY.MM.DD 형태의 string
 */
export const formatDate = (date?: Date): string => {
  if (!date) return '';

  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;
};

/**
 * 오늘, 모레 Date객체를 배열에 담아 return하는 함수
 * @returns [today, twoDaysLater]
 */
export const getDefaultDates = () => {
  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);
  return [today, twoDaysLater];
};

/**
 * 'YY.MM.DD' 형식의 문자열이나 Date 객체를 Date 객체로 변환하는 함수
 * @param dateStr : 'YY.MM.DD' 형식의 문자열 또는 Date 객체
 * @returns Date 객체
 */
export const parseDateString = (dateStr: string | Date): Date => {
  // 이미 Date 객체인 경우 그대로 반환
  if (dateStr instanceof Date) {
    return dateStr;
  }
  const [year, month, day] = dateStr.split('.').map(Number);
  // '25'년 -> 2025년으로, 월은 0부터 시작하므로 1을 빼줍니다 (9월 -> 8).
  return new Date(2000 + year, month - 1, day);
};

export function getExtFromName(name: string): string | null {
  // 쿼리스트링/해시 잘라내기 (혹시 있을 경우)
  const clean = name.split('?')[0].split('#')[0];

  // 마지막 점 위치
  const lastDot = clean.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === clean.length - 1) return null; // 맨 앞 점(.env) 또는 끝이 점인 경우

  const ext = clean
    .slice(lastDot + 1)
    .toLowerCase()
    .trim();
  // 영숫자/+-_ 만 허용 (원하면 더 빡세게 제한 가능)
  return /^[a-z0-9._+-]+$/.test(ext) ? ext : null;
}

// File 객체에서 편의 함수
export function getExtFromFile(file: File): string | null {
  return getExtFromName(file.name);
}

//스텝 데이터 초기화 함수
export const makeInitial = (): WizardData => ({
  step1: { address: '', detailAddress: '' },
  step2: { items: [] },
  step3: { capacity: 2, areaSize: 25 },
  step4: { hostName: '', hostPhone: '' },
  step5: { description: '' },
});

//wizard 관련 함수

export function reducer(state: WizardData, action: WizardActions): WizardData {
  switch (action.type) {
    case 'SET_STEP1':
      return { ...state, step1: { ...state.step1, ...action.payload } };
    case 'SET_STEP2':
      return { ...state, step2: { ...state.step2, ...action.payload } };
    case 'SET_STEP3':
      return { ...state, step3: { ...state.step3, ...action.payload } };
    case 'SET_STEP4':
      return { ...state, step4: { ...state.step4, ...action.payload } };
    case 'SET_STEP5':
      return { ...state, step5: { ...state.step5, ...action.payload } };
    case 'STEP2_ADD_FILES': {
      const appended = action.payload.files.map(
        (file) =>
          ({
            id: crypto.randomUUID(),
            file,
            blobUrl: URL.createObjectURL(file),
          }) satisfies Step2Item,
      );
      return { ...state, step2: { items: [...state.step2.items, ...appended] } };
    }
    case 'STEP2_COMMIT_KEYS': {
      const keyById = new Map(action.payload.pairs.map((p) => [p.id, p.s3Key]));
      const nextItems = state.step2.items.map((it) =>
        keyById.has(it.id) ? { ...it, s3Key: keyById.get(it.id)! } : it,
      );
      return { ...state, step2: { items: nextItems } };
    }
    case 'STEP2_REMOVE_ITEM': {
      const next = state.step2.items.filter((it) => it.id !== action.payload.id);
      return { ...state, step2: { items: next } };
    }
    case 'STEP2_CLEAR': {
      state.step2.items.forEach((it) => {
        if (it.blobUrl) URL.revokeObjectURL(it.blobUrl);
      });
      return { ...state, step2: { items: [] } };
    }

    case 'RESET':
      return makeInitial();
    default:
      return state;
  }
}

export function keyToPublicUrl(key: string) {
  return `https://sido-upload.s3.ap-northeast-2.amazonaws.com/${key}`;
}
