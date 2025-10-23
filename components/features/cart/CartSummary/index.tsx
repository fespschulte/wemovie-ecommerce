"use client";

import React from "react";
import { PurchaseSuccess } from "../PurchaseSuccess";
import { CartSummaryDesktop } from "./CartSummaryDesktop";
import { CartSummaryMobile } from "./CartSummaryMobile";
import { useCartSummary } from "./hooks/useCartSummary";
import { ResponsiveLayout } from "@/components/ui/ResponsiveLayout";

interface CartSummaryProps {
  totalPrice: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice }) => {
  const { handlers, state, items } = useCartSummary({
    totalPrice,
  });

  if (state.isSuccess) {
    return <PurchaseSuccess />;
  }

  return (
    <ResponsiveLayout
      desktop={
        <CartSummaryDesktop
          totalPrice={totalPrice}
          handlers={handlers}
          state={state}
        />
      }
      mobile={
        <CartSummaryMobile
          totalPrice={totalPrice}
          handlers={handlers}
          state={state}
        />
      }
    />
  );
};
