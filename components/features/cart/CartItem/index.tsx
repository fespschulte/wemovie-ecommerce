import React, { memo } from "react";
import type { CartItem as CartItemType } from "@/types/movie";
import { CartItemDesktop } from "./CartItemDesktop";
import { CartItemMobile } from "./CartItemMobile";
import { useCartItem } from "./hooks/useCartItem";
import { ResponsiveLayout } from "@/components/ui/ResponsiveLayout";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = memo(
  ({ item, onUpdateQuantity, onRemove }) => {
    const { handlers, subtotal } = useCartItem({
      item,
      onUpdateQuantity,
      onRemove,
    });

    return (
      <div className="pb-[21px] sm:pb-6">
        <ResponsiveLayout
          desktop={
            <CartItemDesktop
              item={item}
              subtotal={subtotal}
              handlers={handlers}
            />
          }
          mobile={
            <CartItemMobile
              item={item}
              subtotal={subtotal}
              handlers={handlers}
            />
          }
        />
      </div>
    );
  }
);

CartItem.displayName = "CartItem";
