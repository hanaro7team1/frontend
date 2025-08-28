/**
 * Date객체를 YY.MM.DD 형태로 format해주는 함수
 * @param date : Date 객체
 * @returns YY.MM.DD 형태의 string
 */
export const formatDate = (date?: Date): string => {
  if (!date) return '';

  // getFullYear()로 4자리 연도를 가져와서 .slice(-2)로 2자리로 변경.
  const year = date.getFullYear().toString().slice(-2);

  // getMonth()는 0부터 시작하므로 (0 = 1월) 1을 더하기
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
