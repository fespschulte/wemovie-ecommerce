import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CartItem } from "@/types/movie";

interface PurchaseState {
  status: "idle" | "processing" | "success" | "error";
  purchaseId?: string;
  error?: string;

  processPurchase: (items: CartItem[], totalPrice: number) => Promise<boolean>;
  resetPurchase: () => void;

  isProcessing: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const usePurchaseStore = create<PurchaseState>()(
  devtools(
    (set, get) => ({
      status: "idle",
      purchaseId: undefined,
      error: undefined,
      processPurchase: async (items: CartItem[], totalPrice: number) => {
        try {
          set({ status: "processing", error: undefined });

          await new Promise((resolve) => setTimeout(resolve, 1500));
          if (items.length === 0) {
            throw new Error("Carrinho vazio");
          }

          if (totalPrice <= 0) {
            throw new Error("Valor inválido");
          }

          const purchaseId = `PUR-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;

          set({
            status: "success",
            purchaseId,
            error: undefined,
          });

          return true; // Sucesso
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";
          set({
            status: "error",
            error: errorMessage,
            purchaseId: undefined,
          });

          return false; // Erro
        }
      },

      resetPurchase: () => {
        set({
          status: "idle",
          purchaseId: undefined,
          error: undefined,
        });
      },

      isProcessing: false,
      isSuccess: false,
      isError: false,
    }),
    {
      name: "purchase-store",
    }
  )
);
