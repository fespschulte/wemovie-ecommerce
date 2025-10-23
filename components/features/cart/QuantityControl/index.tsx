import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useQuantityControl } from "./hooks/useQuantityControl";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onQuantityChange?: (quantity: number) => void;
  disabled?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onQuantityChange,
  disabled = false,
}) => {
  const { state, handlers } = useQuantityControl({
    quantity,
    onIncrease,
    onDecrease,
    onQuantityChange,
    disabled,
  });

  const {
    handleInputChange,
    handleInputBlur,
    handleInputKeyDown,
    handleIncrease,
    handleDecrease,
    handleEdit,
  } = handlers;

  const { isEditing, inputValue, disabled: isDisabled } = state;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleDecrease}
        disabled={isDisabled}
        className="flex h-[26px] w-[18x] items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuir quantidade"
      >
        <Image
          src="/decrease-icon.svg"
          alt="Diminuir quantidade"
          width={18}
          height={18}
          unoptimized={true}
        />
      </button>

      <div className="flex h-[26px] min-w-[59px] max-w-[62px] items-center justify-center rounded border border-[#D9D9D9] bg-white">
        {isEditing ? (
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="h-full w-full text-center text-sm border-0 p-0 focus-visible:ring-0"
            autoFocus
            type="number"
            min="1"
            max={99}
          />
        ) : (
          <span
            className="text-sm font-normal text-dark cursor-pointer w-full text-center"
            onClick={handleEdit}
          >
            {quantity}
          </span>
        )}
      </div>

      <button
        onClick={handleIncrease}
        disabled={isDisabled}
        className="flex h-[26px] w-[18x] items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar quantidade"
      >
        <Image
          src="/increase-icon.svg"
          alt="Aumentar quantidade"
          width={18}
          height={18}
          unoptimized={true}
        />
      </button>
    </div>
  );
};
