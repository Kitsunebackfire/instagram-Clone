import { render, screen } from "@testing-library/react";
import App from "./App";

//necessary for toBeInTheDocument to work
import "@testing-library/jest-dom";

test("renders learn react link", () => {
  render(<App />);
  const app = screen.getByText(/learn react/i);
  expect(app).toBeInTheDocument();
});
