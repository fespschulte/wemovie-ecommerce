import React from "react";
import { CustomButton } from "@/components/ui/ButtonCustom";
import { formatPrice } from "@/lib/formatters/price";

interface CartSummaryDesktopProps {
  totalPrice: number;
  handlers: {
    handleCheckout: () => Promise<void>;
    handleRetry: () => void;
  };
  state: {
    isProcessing: boolean;
    isError: boolean;
    error?: string;
  };
}

export const CartSummaryDesktop: React.FC<CartSummaryDesktopProps> = ({
  totalPrice,
  handlers,
  state,
}) => {
  const { handleCheckout, handleRetry } = handlers;
  const { isProcessing, isError, error } = state;

  return (
    <div className="hidden sm:flex items-center justify-between border-t border-text-secondary pt-6">
      <CustomButton
        variant="primary"
        onClick={handleCheckout}
        disabled={isProcessing}
        className="px-8 text-sm"
      >
        {isProcessing ? "PROCESSANDO..." : "FINALIZAR PEDIDO"}
      </CustomButton>

      {isError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">Erro: {error}</p>
          <button
            onClick={handleRetry}
            className="text-xs underline mt-1 cursor-pointer"
          >
            Tentar novamente
          </button>
        </div>
      )}

      <div className="flex items-center gap-8">
        <span className="text-sm font-bold uppercase text-text-secondary">
          Total
        </span>
        <span className="text-2xl font-bold text-dark">
          {formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
};
