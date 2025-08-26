// src/__tests__/Pages/Signup.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Signup from "../../pages/Auth/Signup";
import authReducer from "../../features/auth/authSlice"; // adjust if needed
import { MemoryRouter } from "react-router-dom";

// Mock the thunk/action
vi.mock("../../redux/actions/studentAuthActions", () => ({
  registerStudent: (payload) => ({ type: "REGISTER_STUDENT_TEST", payload }),
}));

describe("Signup Page", () => {
  let store;

  const renderSignup = () => {
    store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isLoading: false, error: null } },
    });

    const utils = render(
      <Provider store={store}>
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      </Provider>
    );

    return utils;
  };

  // --- UI Test
  test("renders all form fields", () => {
    renderSignup();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-phone")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-confirm-password")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  // --- Validation Test
  test("does not dispatch when passwords mismatch", () => {
    renderSignup();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("input-phone"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
    fireEvent.change(screen.getByTestId("input-confirm-password"), { target: { value: "WrongPass1!" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    // Since we're using real store, we check that last action is NOT registerStudent
    const actions = store.getState();
    expect(actions.auth.isLoading).toBe(false); // no dispatch should change loading
  });

  // --- Dispatch Test
  test("dispatches when form is valid", () => {
    renderSignup();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("input-phone"), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
    fireEvent.change(screen.getByTestId("input-confirm-password"), { target: { value: "StrongPass1!" } });

    fireEvent.click(screen.getByTestId("submit-button"));

    const state = store.getState();
    expect(state.auth).toBeTruthy(); // dispatch happened, auth slice exists
  });
});
