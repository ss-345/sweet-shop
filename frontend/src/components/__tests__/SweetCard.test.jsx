import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SweetCard from "../SweetCard.jsx";
import authSlice from "../../store/slices/authSlice.js";
import sweetsSlice from "../../store/slices/sweetsSlice.js";

const createMockStore = (initialAuthState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      sweets: sweetsSlice,
    },
    preloadedState: {
      auth: {
        user: { id: "1", name: "Test User", role: "user" },
        isAuthenticated: true,
        loading: false,
        error: null,
        ...initialAuthState,
      },
    },
  });
};

const mockSweet = {
  id: "1",
  name: "Gulab Jamun",
  category: "Indian",
  price: 5,
  quantity: 10,
};

describe("SweetCard", () => {
  it("renders sweet information correctly", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SweetCard sweet={mockSweet} />
      </Provider>
    );

    expect(screen.getByText("Gulab Jamun")).toBeInTheDocument();
    expect(screen.getByText("Indian")).toBeInTheDocument();
    expect(screen.getByText("$5")).toBeInTheDocument();
    expect(screen.getByText("10 pieces")).toBeInTheDocument();
    expect(screen.getByText("Purchase")).toBeInTheDocument();
  });

  it("disables purchase button when quantity is 0", () => {
    const store = createMockStore();
    const outOfStockSweet = { ...mockSweet, quantity: 0 };

    render(
      <Provider store={store}>
        <SweetCard sweet={outOfStockSweet} />
      </Provider>
    );

    const purchaseButton = screen.getByText("Out of Stock");
    expect(purchaseButton).toBeDisabled();
  });

  it("does not show purchase button for admin users", () => {
    const store = createMockStore({
      user: { id: "1", name: "Admin User", role: "admin" },
    });

    render(
      <Provider store={store}>
        <SweetCard sweet={mockSweet} />
      </Provider>
    );

    expect(screen.queryByText("Purchase")).not.toBeInTheDocument();
    expect(screen.queryByText("Out of Stock")).not.toBeInTheDocument();
  });

  it("calls purchase action when purchase button is clicked", () => {
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <SweetCard sweet={mockSweet} />
      </Provider>
    );

    const purchaseButton = screen.getByText("Purchase");
    fireEvent.click(purchaseButton);

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "sweets/purchaseSweet/pending",
      })
    );
  });
});
