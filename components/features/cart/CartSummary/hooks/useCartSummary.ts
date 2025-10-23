import { useCallback } from "react";
import { usePurchase } from "../../hooks/usePurchase";
import { useCartState } from "../../hooks/useCartState";
import { useCartActions } from "../../hooks/useCartActions";

interface UseCartSummaryProps {
  totalPrice: number;
}

interface UseCartSummaryReturn {
  handlers: {
    handleCheckout: () => Promise<void>;
    handleRetry: () => void;
  };
  state: {
    isProcessing: boolean;
    isSuccess: boolean;
    isError: boolean;
    error?: string;
  };
  items: any[];
}

/**
 * Hook para lógica do CartSummary
 * Centraliza toda a lógica de checkout e estado de compra
 */
export const useCartSummary = ({
  totalPrice,
}: UseCartSummaryProps): UseCartSummaryReturn => {
  const { items } = useCartState();
  const { handleClearCart } = useCartActions();
  const {
    processPurchase,
    resetPurchase,
    isProcessing,
    isSuccess,
    isError,
    error,
  } = usePurchase();

  const handleCheckout = useCallback(async () => {
    try {
      const success = await processPurchase(items, totalPrice);

      // Só limpar carrinho se a compra foi bem-sucedida
      if (success) {
        handleClearCart(); // Limpar carrinho apenas após sucesso
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
    }
  }, [processPurchase, items, totalPrice, handleClearCart]);

  const handleRetry = useCallback(() => {
    resetPurchase();
  }, [resetPurchase]);

  return {
    handlers: {
      handleCheckout,
      handleRetry,
    },
    state: {
      isProcessing,
      isSuccess,
      isError,
      error,
    },
    items,
  };
};
