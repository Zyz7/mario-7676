import { paymentStore } from "../stores/payment.store";

export const paymentHook = () => {
  return paymentStore();
};
