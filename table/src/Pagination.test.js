import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();
  const mockSetCurrentPage = jest.fn();
  const mockSetGoToPage = jest.fn();

  const defaultProps = {
    currentPage: 1,
    totalRows: 50,
    rowsPerPage: 5,
    onPageChange: mockOnPageChange,
    setCurrentPage: mockSetCurrentPage,
    gotoPage: "",
    setGoToPage: mockSetGoToPage,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders total pages and current page", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText("Total Pages: 10")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("disables 'Previous' button on the first page", () => {
    render(<Pagination {...defaultProps} />);
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  test("disables 'Next' button on the last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  test("'Previous' and 'Next' buttons call onPageChange with correct values", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    fireEvent.click(screen.getByText("Previous"));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(6);
  });

  test("displays error message for invalid 'Go to page' input", () => {
    render(<Pagination {...defaultProps} />);
    const input = screen.getByPlaceholderText("Go to page");
    const goButton = screen.getByText("Go");

    fireEvent.change(input, { target: { value: "15" } });
    fireEvent.click(goButton);

    expect(screen.getByText("Page number must be between 1 and 10")).toBeInTheDocument();
    expect(mockSetCurrentPage).not.toHaveBeenCalled();
  });

  test("calls setGoToPage on input change", () => {
    render(<Pagination {...defaultProps} />);
    const input = screen.getByPlaceholderText("Go to page");

    fireEvent.change(input, { target: { value: "5" } });
    expect(mockSetGoToPage).toHaveBeenCalledWith("5");
  });

});
