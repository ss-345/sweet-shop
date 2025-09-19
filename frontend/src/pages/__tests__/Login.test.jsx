import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Login from "../Login.jsx";
import authSlice from "../../store/slices/authSlice.js";

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderWithProviders = (component, { store = createMockStore() } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe("Login", () => {
  it("renders login form correctly", () => {
    renderWithProviders(<Login />);

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("shows error message when login fails", () => {
    const store = createMockStore({
      error: "Invalid credentials",
    });

    renderWithProviders(<Login />, { store });

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("shows loading state during login", () => {
    const store = createMockStore({
      loading: true,
    });

    renderWithProviders(<Login />, { store });

    expect(screen.getByText("Signing in...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("submits form with correct data", async () => {
    const store = createMockStore();
    const dispatchSpy = jest.spyOn(store, "dispatch");

    renderWithProviders(<Login />, { store });

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "auth/login/pending",
        })
      );
    });
  });

  it("clears error when user starts typing", () => {
    const store = createMockStore({
      error: "Invalid credentials",
    });
    const dispatchSpy = jest.spyOn(store, "dispatch");

    renderWithProviders(<Login />, { store });

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/clearError",
      })
    );
  });
});
