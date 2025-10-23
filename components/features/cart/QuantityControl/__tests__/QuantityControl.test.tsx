import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QuantityControl } from "../index";

// Mock the useQuantityControl hook
jest.mock("../hooks/useQuantityControl", () => ({
  useQuantityControl: () => ({
    state: {
      isEditing: false,
      inputValue: "2",
      disabled: false,
    },
    handlers: {
      handleInputChange: jest.fn(),
      handleInputBlur: jest.fn(),
      handleInputKeyDown: jest.fn(),
      setIsEditing: jest.fn(),
      handleIncrease: jest.fn(),
      handleDecrease: jest.fn(),
      handleEdit: jest.fn(),
    },
  }),
}));

const mockHandlers = {
  onIncrease: jest.fn(),
  onDecrease: jest.fn(),
  onQuantityChange: jest.fn(),
};

describe("QuantityControl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with correct initial quantity", () => {
    render(
      <QuantityControl
        quantity={3}
        onIncrease={mockHandlers.onIncrease}
        onDecrease={mockHandlers.onDecrease}
        onQuantityChange={mockHandlers.onQuantityChange}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should render increase and decrease buttons", () => {
    render(
      <QuantityControl
        quantity={2}
        onIncrease={mockHandlers.onIncrease}
        onDecrease={mockHandlers.onDecrease}
        onQuantityChange={mockHandlers.onQuantityChange}
      />
    );

    expect(screen.getByLabelText("Aumentar quantidade")).toBeInTheDocument();
    expect(screen.getByLabelText("Diminuir quantidade")).toBeInTheDocument();
  });

  it("should render quantity display", () => {
    render(
      <QuantityControl
        quantity={5}
        onIncrease={mockHandlers.onIncrease}
        onDecrease={mockHandlers.onDecrease}
        onQuantityChange={mockHandlers.onQuantityChange}
      />
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
