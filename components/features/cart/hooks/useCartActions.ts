import { useCallback } from "react";
import { cartStore } from "../stores/cartStore";
import { useToast } from "@/hooks/useToast";
import type { Movie } from "@/types/movie";

/**
 * Hook para ações do carrinho de compras
 */
export const useCartActions = () => {
  const { addItem, removeItem, updateQuantity, clearCart } = cartStore();
  const { showSuccess, showInfo } = useToast();

  const handleAddItem = useCallback(
    (movie: Movie) => {
      addItem(movie);
      showSuccess(`${movie.title} adicionado ao carrinho!`);
    },
    [addItem, showSuccess]
  );

  const handleRemoveItem = useCallback(
    (id: number) => {
      removeItem(id);
      showInfo("Item removido do carrinho");
    },
    [removeItem, showInfo]
  );

  const handleUpdateQuantity = useCallback(
    (id: number, quantity: number) => {
      updateQuantity(id, quantity);
      showInfo(`Quantidade atualizada para ${quantity}`);
    },
    [updateQuantity, showInfo]
  );

  const handleClearCart = useCallback(() => {
    clearCart();
    showInfo("Carrinho esvaziado");
  }, [clearCart, showInfo]);

  return {
    handleAddItem,
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart,
  };
};
