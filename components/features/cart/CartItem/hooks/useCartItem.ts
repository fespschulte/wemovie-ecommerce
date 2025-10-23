import { useCallback } from "react";
import type { CartItem as CartItemType } from "@/types/movie";

interface UseCartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

interface UseCartItemReturn {
  handlers: {
    handleIncrease: () => void;
    handleDecrease: () => void;
    handleQuantityChange: (quantity: number) => void;
    handleRemove: () => void;
  };
  subtotal: number;
}

/**
 * Hook para gerenciar a lógica de negócio de um item do carrinho
 * Extrai toda a lógica de manipulação de quantidade e remoção
 */
export const useCartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: UseCartItemProps): UseCartItemReturn => {
  const handleIncrease = useCallback(() => {
    onUpdateQuantity(item.id, item.quantity + 1);
  }, [item.id, item.quantity, onUpdateQuantity]);

  const handleDecrease = useCallback(() => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  }, [item.id, item.quantity, onUpdateQuantity, onRemove]);

  const handleQuantityChange = useCallback(
    (quantity: number) => {
      onUpdateQuantity(item.id, quantity);
    },
    [item.id, onUpdateQuantity]
  );

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  const subtotal = item.price * item.quantity;

  return {
    handlers: {
      handleIncrease,
      handleDecrease,
      handleQuantityChange,
      handleRemove,
    },
    subtotal,
  };
};
