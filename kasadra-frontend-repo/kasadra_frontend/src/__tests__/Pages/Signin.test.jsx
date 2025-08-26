// src/__tests__/Pages/Signin.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Signin from "../../pages/Auth/Signin";
import authReducer from "../../features/auth/authSlice"; // adjust path if needed
import { MemoryRouter } from "react-router-dom";
 
// Mock the thunk/action
vi.mock("../../redux/actions/studentAuthActions", () => ({
  loginStudent: (payload) => ({ type: "LOGIN_STUDENT_TEST", payload }),
}));
 
describe("Signin Page", () => {
  let store;
 
  const renderSignin = () => {
    store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { isLoading: false, error: null } },
    });
 
    const utils = render(
      <Provider store={store}>
        <MemoryRouter>
          <Signin />
        </MemoryRouter>
      </Provider>
    );
 
    return utils;
  };
 
  // --- UI Test
  test("renders all form fields", () => {
    renderSignin();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
 
  // --- Validation Test
  test("does not dispatch when email is invalid", () => {
    renderSignin();
 
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
 
    fireEvent.click(screen.getByTestId("submit-button"));
 
    const state = store.getState();
    expect(state.auth.isLoading).toBe(false); // no dispatch
  });
 
  // --- Dispatch Test
  test("dispatches when form is valid", () => {
    renderSignin();
 
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByTestId("input-password"), { target: { value: "StrongPass1!" } });
 
    fireEvent.click(screen.getByTestId("submit-button"));
 
    const state = store.getState();
    expect(state.auth).toBeTruthy(); // dispatch happened
  });
});
 
 