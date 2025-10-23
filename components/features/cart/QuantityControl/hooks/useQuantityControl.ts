import { useState, useCallback } from "react";
import { validateQuantity } from "@/lib/validators/quantity";
import { useToast } from "@/hooks/useToast";

interface UseQuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onQuantityChange?: (quantity: number) => void;
  disabled?: boolean;
}

interface UseQuantityControlReturn {
  state: {
    isEditing: boolean;
    inputValue: string;
    disabled: boolean;
  };
  handlers: {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputBlur: () => void;
    handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleIncrease: () => void;
    handleDecrease: () => void;
    handleEdit: () => void;
  };
}

/**
 * Hook para lógica do QuantityControl
 * Centraliza toda a lógica de edição e validação de quantidade
 */
export const useQuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
  onQuantityChange,
  disabled = false,
}: UseQuantityControlProps): UseQuantityControlReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(quantity.toString());
  const { showError } = useToast();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
    },
    []
  );

  const handleInputBlur = useCallback(() => {
    const validationResult = validateQuantity(inputValue);

    if (validationResult.isValid && validationResult.value !== undefined) {
      if (validationResult.value !== quantity && onQuantityChange) {
        onQuantityChange(validationResult.value);
      }
    } else {
      showError(validationResult.error || "Quantidade inválida");
      setInputValue(quantity.toString());
    }

    setIsEditing(false);
  }, [inputValue, quantity, onQuantityChange, showError]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleInputBlur();
      }
      if (e.key === "Escape") {
        setInputValue(quantity.toString());
        setIsEditing(false);
      }
    },
    [handleInputBlur, quantity]
  );

  const handleIncrease = useCallback(() => {
    onIncrease();
  }, [onIncrease]);

  const handleDecrease = useCallback(() => {
    onDecrease();
  }, [onDecrease]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  return {
    state: {
      isEditing,
      inputValue,
      disabled: disabled || quantity >= 99,
    },
    handlers: {
      handleInputChange,
      handleInputBlur,
      handleInputKeyDown,
      handleIncrease,
      handleDecrease,
      handleEdit,
    },
  };
};
