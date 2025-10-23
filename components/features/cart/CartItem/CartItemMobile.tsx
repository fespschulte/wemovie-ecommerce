import React from "react";
import Image from "next/image";
import type { CartItem as CartItemType } from "@/types/movie";
import { QuantityControl } from "../QuantityControl";
import { RemoveButton } from "@/components/ui/RemoveButton";
import { formatPrice } from "@/lib/formatters/price";

interface CartItemMobileProps {
  item: CartItemType;
  subtotal: number;
  handlers: {
    handleIncrease: () => void;
    handleDecrease: () => void;
    handleQuantityChange: (quantity: number) => void;
    handleRemove: () => void;
  };
}

export const CartItemMobile: React.FC<CartItemMobileProps> = ({
  item,
  subtotal,
  handlers,
}) => {
  const { handleIncrease, handleDecrease, handleQuantityChange, handleRemove } =
    handlers;

  return (
    <div className="sm:hidden flex flex-col">
      {/* Product Info Row */}
      <div className="flex items-start">
        {/* Movie Image */}
        <div className="relative h-[82px] w-[64px] shrink-0 overflow-hidden rounded mr-4">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="82px"
            quality={100}
          />
        </div>

        {/* Content Area - 2 rows */}
        <div className="flex flex-col justify-between h-[92px] flex-1">
          {/* Row 1: Title + Price + Remove Button */}
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-bold text-dark leading-tight max-w-[102px]">
              {item.title}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-base font-bold text-dark">
                {formatPrice(item.price)}
              </span>
              <RemoveButton onRemove={handleRemove} />
            </div>
          </div>

          {/* Row 2: Quantity Control + Subtotal */}
          <div className="flex items-center justify-between pr-4">
            <QuantityControl
              quantity={item.quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onQuantityChange={handleQuantityChange}
            />
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold uppercase text-text-secondary">
                SUBTOTAL
              </span>
              <span className="text-base font-bold text-dark">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
