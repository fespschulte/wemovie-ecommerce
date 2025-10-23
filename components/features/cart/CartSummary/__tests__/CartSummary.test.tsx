import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CartSummary } from "../index";

// Mock the hook
jest.mock("../hooks/useCartSummary", () => ({
  useCartSummary: () => ({
    handlers: {
      handleCheckout: jest.fn(),
      handleRetry: jest.fn(),
    },
    state: {
      isProcessing: false,
      isSuccess: false,
      isError: false,
      error: undefined,
    },
    items: [],
  }),
}));

describe("CartSummary", () => {
  it("should render total price correctly", () => {
    render(<CartSummary totalPrice={99.99} />);

    expect(screen.getAllByText("R$ 99,99")).toHaveLength(2); // Desktop + Mobile
    expect(screen.getAllByText("Total")).toHaveLength(2); // Desktop + Mobile
  });

  it("should show checkout button", () => {
    render(<CartSummary totalPrice={99.99} />);

    const checkoutButtons = screen.getAllByText("Finalizar pedido");
    expect(checkoutButtons).toHaveLength(2); // Desktop + Mobile
    checkoutButtons.forEach((button) => {
      expect(button).not.toBeDisabled();
    });
  });

  it("should format price correctly with Brazilian locale", () => {
    render(<CartSummary totalPrice={1234.56} />);

    expect(screen.getAllByText("R$ 1.234,56")).toHaveLength(2); // Desktop + Mobile
  });

  it("should handle zero total price", () => {
    render(<CartSummary totalPrice={0} />);

    expect(screen.getAllByText("R$ 0,00")).toHaveLength(2); // Desktop + Mobile
  });
});
