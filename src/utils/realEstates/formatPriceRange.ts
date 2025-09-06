export const formatPrice = (price: number): string => {
  if (price >= 100000000) {
    const 억 = Math.floor(price / 100000000);
    const 만원 = Math.floor((price % 100000000) / 10000);
    return 만원 > 0 ? `${억}억 ${만원.toLocaleString()}만원` : `${억}억`;
  }
  return `${(price / 10000).toLocaleString()}만원`;
};

/**
 * 가격 범위를 포맷팅
 * @example formatPriceRange(40000000, 60000000) -> "4,000만원 ~ 6,000만원"
 */
export const formatPriceRange = (min: number, max: number): string => {
  return `${formatPrice(min)} ~ ${formatPrice(max)}`;
};
