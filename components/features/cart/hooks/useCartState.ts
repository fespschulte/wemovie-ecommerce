import { cartStore } from "../stores/cartStore";

/**
 * Hook para estado do carrinho de compras
 */
export const useCartState = () => {
  const { items, getTotalItems, getTotalPrice } = cartStore();

  return {
    items,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    isEmpty: items.length === 0,
  };
};
