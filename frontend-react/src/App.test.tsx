import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mock the authService
jest.mock("./services/authService", () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getCurrentUser: jest.fn().mockReturnValue(null),
    getAuthHeader: jest.fn().mockReturnValue({}),
  },
}));

test("renders TinPets app", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Update this to match something that should be in your app
  const appElement = screen.getByText(/TinPets/i);
  expect(appElement).toBeInTheDocument();
});
