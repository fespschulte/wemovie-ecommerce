import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CartItem } from "@/types/movie";

interface PurchaseState {
  // Estado
  status: "idle" | "processing" | "success" | "error";
  purchaseId?: string;
  error?: string;

  // Ações
  processPurchase: (items: CartItem[], totalPrice: number) => Promise<boolean>;
  resetPurchase: () => void;

  // Computed (getters)
  isProcessing: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export const usePurchaseStore = create<PurchaseState>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      status: "idle",
      purchaseId: undefined,
      error: undefined,

      // Ações
      processPurchase: async (items: CartItem[], totalPrice: number) => {
        try {
          set({ status: "processing", error: undefined });

          // Simular delay de processamento
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Validações de negócio
          if (items.length === 0) {
            throw new Error("Carrinho vazio");
          }

          if (totalPrice <= 0) {
            throw new Error("Valor inválido");
          }

          // Simular processamento de pagamento
          const purchaseId = `PUR-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`;

          // Em produção, aqui seria a integração com gateway de pagamento
          // const paymentResult = await this.processPayment(request);

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

      // Computed (getters)
      isProcessing: false,
      isSuccess: false,
      isError: false,
    }),
    {
      name: "purchase-store",
    }
  )
);
