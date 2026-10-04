export interface BalanceResponseDto {
  Balance: number;
}

export interface PaymentStore {
  balance: number;
  isLoading: boolean;

  initializeBalance: () => Promise<void>;
}
