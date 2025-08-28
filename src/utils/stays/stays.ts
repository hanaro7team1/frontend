/**
 * Date객체를 2025.08.27 형태로 format해주는 함수
 * @param date : Date 객체
 * @returns 2025.08.27 형태의 string
 */
export const formatDate = (date?: Date): string =>
  date ? date.toISOString().split('T')[0].replaceAll('-', '.') : '';

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
