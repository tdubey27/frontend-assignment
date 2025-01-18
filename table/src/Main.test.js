import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Main from "./Main";

jest.mock("axios");

describe("Main Component", () => {
  const mockData = [
    { "s.no": 1, "percentage.funded": "80%", "amt.pledged": "$10,000" },
    { "s.no": 2, "percentage.funded": "60%", "amt.pledged": "$5,000" },
    { "s.no": 3, "percentage.funded": "90%", "amt.pledged": "$12,000" },
    { "s.no": 4, "percentage.funded": "70%", "amt.pledged": "$8,000" },
    { "s.no": 5, "percentage.funded": "85%", "amt.pledged": "$11,000" },
    { "s.no": 6, "percentage.funded": "75%", "amt.pledged": "$9,000" },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockData });
  });

  test("fetches data and renders table", async () => {
    render(<Main />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const headings = screen.getAllByRole("columnheader");
    expect(headings).toHaveLength(3); 
    expect(headings[0].textContent).toBe("s no");
    expect(headings[1].textContent).toBe("percentage funded");
    expect(headings[2].textContent).toBe("amt pledged");

    const cells = screen.getAllByRole("cell");
    expect(cells[0].textContent).toBe("1");
    expect(cells[1].textContent).toBe("80%");
    expect(cells[2].textContent).toBe("$10,000");
  });

  test("renders the pagination correctly", async () => {
    render(<Main />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const prevButton = screen.getByText(/Previous/i);
    const nextButton = screen.getByText(/Next/i);

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

  });

  test("handles page change on pagination", async () => {
    render(<Main />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const currentPageButton = screen.getByText(/1/i);
    expect(currentPageButton).toBeInTheDocument();

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    const pageButton = screen.getByText(/2/i);
    expect(pageButton).toBeInTheDocument();
  });

  test("handles go to page input", async () => {
    render(<Main />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const input = screen.getByPlaceholderText(/Go to page/i);
    const goButton = screen.getByText(/Go/i);

    fireEvent.change(input, { target: { value: "2" } });
    fireEvent.click(goButton);

    const pageButton = screen.getByText(/2/i);
    expect(pageButton).toBeInTheDocument();
  });


});
