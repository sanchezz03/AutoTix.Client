export function formatPrice(rawPrice: number): string {
  const price = Math.round(rawPrice / 100);
  return `${price} грн`;
}
