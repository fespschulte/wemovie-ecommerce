import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CartItem } from "../index";
import type { CartItem as CartItemType } from "@/types/movie";

// Mock the useCartItem hook
jest.mock("../hooks/useCartItem", () => ({
  useCartItem: () => ({
    handlers: {
      handleIncrease: jest.fn(),
      handleDecrease: jest.fn(),
      handleQuantityChange: jest.fn(),
      handleRemove: jest.fn(),
    },
    subtotal: 59.98,
  }),
}));

// Mock the ResponsiveLayout to avoid desktop/mobile duplication
jest.mock("@/components/ui/ResponsiveLayout", () => ({
  ResponsiveLayout: ({
    desktop,
    mobile,
  }: {
    desktop: React.ReactNode;
    mobile: React.ReactNode;
  }) => (
    <div data-testid="responsive-layout">
      <div data-testid="desktop">{desktop}</div>
      <div data-testid="mobile">{mobile}</div>
    </div>
  ),
}));

// Mock data
const mockCartItem: CartItemType = {
  id: 1,
  title: "Test Movie",
  price: 29.99,
  image: "/test-image.jpg",
  quantity: 2,
};

const mockHandlers = {
  onUpdateQuantity: jest.fn(),
  onRemove: jest.fn(),
};

describe("CartItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render movie information correctly", () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemove={mockHandlers.onRemove}
      />
    );

    // ResponsiveLayout renders both desktop and mobile, so we expect 2 instances
    expect(screen.getAllByText("Test Movie")).toHaveLength(2);
    expect(screen.getAllByText("R$ 29,99")).toHaveLength(2);
  });

  it("should render quantity controls", () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemove={mockHandlers.onRemove}
      />
    );

    // ResponsiveLayout renders both desktop and mobile, so we expect 2 instances
    expect(screen.getAllByText("2")).toHaveLength(2);
    expect(screen.getAllByLabelText("Aumentar quantidade")).toHaveLength(2);
    expect(screen.getAllByLabelText("Diminuir quantidade")).toHaveLength(2);
  });

  it("should render remove button", () => {
    render(
      <CartItem
        item={mockCartItem}
        onUpdateQuantity={mockHandlers.onUpdateQuantity}
        onRemove={mockHandlers.onRemove}
      />
    );

    // ResponsiveLayout renders both desktop and mobile, so we expect 2 instances
    expect(screen.getAllByLabelText("Remover item do carrinho")).toHaveLength(
      2
    );
  });
});
