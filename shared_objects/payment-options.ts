export const PAYMENT = "payment";
export const FREE = "free";
export const PAID = "paid";

export function isPaymentOption(value: string) {
  return [PAYMENT, FREE, PAID].includes(value);
}