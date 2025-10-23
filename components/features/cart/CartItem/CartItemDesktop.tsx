import React from "react";
import Image from "next/image";
import type { CartItem as CartItemType } from "@/types/movie";
import { QuantityControl } from "../QuantityControl";
import { RemoveButton } from "@/components/ui/RemoveButton";
import { formatPrice } from "@/lib/formatters/price";

interface CartItemDesktopProps {
  item: CartItemType;
  subtotal: number;
  handlers: {
    handleIncrease: () => void;
    handleDecrease: () => void;
    handleQuantityChange: (quantity: number) => void;
    handleRemove: () => void;
  };
}

export const CartItemDesktop: React.FC<CartItemDesktopProps> = ({
  item,
  subtotal,
  handlers,
}) => {
  const { handleIncrease, handleDecrease, handleQuantityChange, handleRemove } =
    handlers;

  return (
    <div className="hidden sm:flex items-center">
      {/* Product Info */}
      <div className="flex w-[280px] items-center gap-4">
        <div className="relative h-[114px] w-[91px] shrink-0 overflow-hidden rounded">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="91px"
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold text-dark">{item.title}</h3>
          <span className="text-base font-bold text-dark">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>

      {/* Quantity Control */}
      <div className="flex flex-1 items-center justify-start">
        <QuantityControl
          quantity={item.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      {/* Subtotal */}
      <div className="flex flex-1 items-center justify-start">
        <span className="text-base font-bold text-dark">
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* Remove Button - Aligned to the right */}
      <div className="flex items-center justify-end">
        <RemoveButton onRemove={handleRemove} />
      </div>
    </div>
  );
};
