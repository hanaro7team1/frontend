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
