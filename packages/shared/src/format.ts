/** Small display helpers shared across apps. */

/** ₹1,250 — Indian-grouped rupee formatting without decimals. */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** "24 Oct, 2023" */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Percentage saved vs. original price, or null when not applicable. */
export function discountPercent(
  price: number,
  originalPrice?: number,
): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
