import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table Component", () => {
  const mockHeading = ["s.no", "percentage.funded", "amt.pledged"];
  const mockData = [
    { "s.no": 1, "percentage.funded": "80%", "amt.pledged": "$10,000" },
    { "s.no": 2, "percentage.funded": "60%", "amt.pledged": "$5,000" },
  ];

  test("renders table with correct number of headings", () => {
    render(<Table heading={mockHeading} data={mockData} />);
    const headings = screen.getAllByRole("columnheader");
    expect(headings).toHaveLength(mockHeading.length);

    // Verify headings are displayed with "." replaced by " "
    headings.forEach((headingElement, index) => {
      const expectedHeading = mockHeading[index].replace(".", " ");
      expect(headingElement.textContent).toBe(expectedHeading);
    });
  });

  test("renders correct number of rows and cells", () => {
    render(<Table heading={mockHeading} data={mockData} />);
    const rows = screen.getAllByRole("row");

    // Verify the number of rows (1 header + data rows)
    expect(rows).toHaveLength(mockData.length + 1);

    // Verify each row contains the correct number of cells
    rows.slice(1).forEach((row, rowIndex) => {
      const cells = row.querySelectorAll("td");
      expect(cells).toHaveLength(mockHeading.length);

      // Verify each cell contains the correct data
      cells.forEach((cell, cellIndex) => {
        const headingKey = mockHeading[cellIndex];
        expect(cell.textContent).toBe(String(mockData[rowIndex][headingKey]));
      });
    });
  });

  test("renders an empty table when no data is provided", () => {
    render(<Table heading={mockHeading} data={[]} />);
    const rows = screen.getAllByRole("row");

    // Only the header row should be rendered
    expect(rows).toHaveLength(1);
    const cells = rows[0].querySelectorAll("th");
    expect(cells).toHaveLength(mockHeading.length);
  });
});
