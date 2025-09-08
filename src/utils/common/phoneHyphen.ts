// 숫자만 추출 (최대 max 길이까지)
export const toDigits = (s: string, max = 11) => s.replace(/\D/g, '').slice(0, max);

// 전화번호 포맷팅
export const formatPhone = (raw: string) => {
  const d = raw.replace(/\D/g, '');
  if (d.length < 4) return d;

  // 서울 (02)
  if (d.startsWith('02')) {
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }

  // 휴대폰 (010, 011 등)
  if (/^01[016789]/.test(d)) {
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
  }

  // 일반 지역번호
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  // 지역번호(3자리) 케이스
  if (d.length === 10) {
    return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`; // 3-3-4
  }
  if (d.length === 11) {
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`; // 3-4-4
  }
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
};

/**
 * 하이픈만 지워졌을 때를 감지해 "숫자 1자리 삭제"로 바꿔주는 보정
 * prevRaw: 이전(숫자만), nextView: 사용자가 친 값(하이픈 포함), caret: selectionStart
 * inputType: native.inputType ("deleteContentBackward" 등)
 */
export function coercePhoneRaw(
  prevRaw: string,
  nextView: string,
  caret: number | null | undefined,
  inputType?: string,
) {
  const nextDigits = toDigits(nextView);

  // 실제 숫자 변화가 있으면 그대로 채택 (입력/붙여넣기/일반삭제)
  if (nextDigits !== prevRaw) return nextDigits;

  // 하이픈만 삭제된 백스페이스 → 커서 앞 숫자 1개를 대신 삭제
  if (inputType === 'deleteContentBackward') {
    const c = caret ?? nextView.length;
    const digitsBeforeCaret = nextView.slice(0, c).replace(/\D/g, '').length;
    if (digitsBeforeCaret > 0) {
      const idx = digitsBeforeCaret - 1;
      return prevRaw.slice(0, idx) + prevRaw.slice(idx + 1);
    }
  }

  return prevRaw; // 변화 없음
}

// 전화번호 유효성 검사 (길이 + 0으로 시작)
export const isPhoneLike = (raw: string) => {
  const view = formatPhone(raw);
  const len = view.length;
  return /^0/.test(raw) && len >= 9 && len <= 13;
};
