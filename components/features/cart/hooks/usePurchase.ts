"use client";

import { usePurchaseStore } from "../stores/purchaseStore";
import type { CartItem } from "@/types/movie";

export const usePurchase = () => {
  const store = usePurchaseStore();

  return {
    // Estado
    status: store.status,
    purchaseId: store.purchaseId,
    error: store.error,

    // Ações
    processPurchase: store.processPurchase,
    resetPurchase: store.resetPurchase,

    // Computed
    isProcessing: store.status === "processing",
    isSuccess: store.status === "success",
    isError: store.status === "error",
  };
};
