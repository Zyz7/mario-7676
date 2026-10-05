import { create } from "zustand";
import { storage } from "../utils/storage";
import { paymentService } from "../services/payment.service";
import type { PaymentRecharge, PaymentStore } from "../types/payment.type";


export const paymentStore = create<PaymentStore>((set) => ({
  balance: storage.getBalance(),
  isLoading: true,

  initializeBalance: async () => {
    try {
      const balance = await paymentService.getBalance();

      storage.setBalance(balance);
      set({balance, isLoading: false,});
    } catch {
      // Si falla el backend, mantenemos el valor local
      set({balance: storage.getBalance(), isLoading: false,});
    }
  },

  recharge: async (data: PaymentRecharge) => {
    const payment = await paymentService.recharge(data);
    
    window.location.href = payment.checkoutUrl;
  },

  status: async (id: number) => {
    return await paymentService.status(id);
  },
}));
