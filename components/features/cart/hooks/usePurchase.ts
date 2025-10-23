"use client";

import { usePurchaseStore } from "../stores/purchaseStore";
import type { CartItem } from "@/types/movie";

export const usePurchase = () => {
  const store = usePurchaseStore();

  return {
    status: store.status,
    purchaseId: store.purchaseId,
    error: store.error,

    processPurchase: store.processPurchase,
    resetPurchase: store.resetPurchase,

    isProcessing: store.status === "processing",
    isSuccess: store.status === "success",
    isError: store.status === "error",
  };
};
