"use client";

import { Header } from "@/components/layout/Header";
import { useCartState } from "@/components/features/cart/hooks/useCartState";
import { useCartActions } from "@/components/features/cart/hooks/useCartActions";
import { usePurchase } from "@/components/features/cart/hooks/usePurchase";
import { CartItem } from "@/components/features/cart/CartItem";
import { CartSummary } from "@/components/features/cart/CartSummary";
import { EmptyCart } from "@/components/features/cart/EmptyCart";
import { CartHeader } from "@/components/features/cart/CartHeader";

export default function CartPage() {
  const { items, totalPrice, isEmpty } = useCartState();
  const { handleUpdateQuantity, handleRemoveItem, handleClearCart } =
    useCartActions();
  const { isSuccess } = usePurchase();

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="mx-auto max-w-[1080px] px-4 xl:px-0">
        <div className="rounded bg-white p-4 sm:p-6">
          {isEmpty && !isSuccess ? (
            <EmptyCart />
          ) : isSuccess ? (
            <CartSummary totalPrice={totalPrice} />
          ) : (
            <>
              <CartHeader />
              <div>
                {items.map((item, index) => (
                  <div key={item.id}>
                    <CartItem
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  </div>
                ))}
              </div>
              <CartSummary totalPrice={totalPrice} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
