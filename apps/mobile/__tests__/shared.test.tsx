/**
 * Smoke tests for shared domain helpers.
 *
 * The full <App /> render is intentionally not tested here — it pulls in native
 * modules (navigation, gesture-handler, async-storage, vector-icons) that need
 * jest mocks. Add those under a dedicated setup when component tests are needed.
 *
 * @format
 */
import {
  discountPercent,
  formatPrice,
  getClassName,
} from '@pustakiq/shared';

test('formatPrice groups rupees the Indian way', () => {
  expect(formatPrice(450)).toBe('₹450');
  expect(formatPrice(125000)).toBe('₹1,25,000');
});

test('discountPercent computes savings vs original price', () => {
  expect(discountPercent(450, 899)).toBe(50);
  expect(discountPercent(450)).toBeNull();
  expect(discountPercent(450, 400)).toBeNull();
});

test('getClassName resolves class ids', () => {
  expect(getClassName('cls-10')).toBe('Class 10');
  expect(getClassName('cls-nursery')).toBe('Nursery');
  expect(getClassName(undefined)).toBe('');
});
