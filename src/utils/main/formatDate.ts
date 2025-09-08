export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const yy = String(date.getFullYear()).slice(-2); // 25
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // 09
  const dd = String(date.getDate()).padStart(2, '0'); // 01
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const day = weekdays[date.getDay()]; // 요일
  return `${yy}.${mm}.${dd} (${day})`;
};
