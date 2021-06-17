import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerForm from "../components/CustomerForm";
import { BrowserRouter } from "react-router-dom";

describe("RecipeForm", () => {
  it("should render the basic fields", () => {
    render(
      <BrowserRouter>
        <CustomerForm />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("heading", { name: "Customer Form" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /First Name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /Last Name/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", { name: /Occupation/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: /Bio/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
  });
});

it("should validate form fields", async () => {
  const mockSave = jest.fn();
  render(
    <BrowserRouter>
      <CustomerForm saveData={mockSave} />
    </BrowserRouter>
  );
  fireEvent.input(screen.getByRole("textbox", { name: /First Name/i }), {
    target: {
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /Last Name/i }), {
    target: {
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  });

  fireEvent.input(screen.getByRole("textbox", { name: /Bio/i }), {
    target: {
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  });

});
