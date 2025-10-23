import React from "react";
import { CustomButton } from "@/components/ui/ButtonCustom";
import { formatPrice } from "@/lib/formatters/price";

interface CartSummaryMobileProps {
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

export const CartSummaryMobile: React.FC<CartSummaryMobileProps> = ({
  totalPrice,
  handlers,
  state,
}) => {
  const { handleCheckout, handleRetry } = handlers;
  const { isProcessing, isError, error } = state;

  return (
    <div className="sm:hidden flex flex-col-reverse items-center justify-between border-t border-text-secondary pt-[21px]">
      <CustomButton
        variant="primary"
        onClick={handleCheckout}
        disabled={isProcessing}
        className="px-8 w-full text-xs"
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

      <div className="flex items-start justify-between w-full pb-4">
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
