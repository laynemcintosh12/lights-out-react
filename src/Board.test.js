import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("Board Component", function () {

  describe("Rendering", function () {

    it("should render without crashing", function () {
      render(<Board />);
    });

    it("should match the snapshot for a full board", function () {
      const { asFragment } = render(<Board chanceLightStartsOn={1} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("should display win state when lights are out", function () {
      const { getByText } = render(<Board chanceLightStartsOn={0} />);
      expect(getByText("You Won!")).toBeInTheDocument();
    });
  });


  describe("Cell Click", function () {

    it("should toggle lights correctly", function () {
      const { getAllByRole } = render(
        <Board nrows={3} ncols={3} chanceLightStartsOn={1} />,
      );
      const cells = getAllByRole("cell");

      // All cells start out as lit
      cells.forEach(cell => {
        expect(cell).toHaveClass("Cell-lit");
      });

      // Click on the middle cell
      fireEvent.click(cells[4]);

      // Now only cells at the corners should be lit
      let litIndices = [0, 2, 6, 8];
      cells.forEach((cell, idx) => {
        if (litIndices.includes(idx)) {
          expect(cell).toHaveClass("Cell-lit");
        } else {
          expect(cell).not.toHaveClass("Cell-lit");
        }
      });
    });

    it("should indicate winning state when clicking the board", function () {
      // Create a board that can be completed in one click
      const { queryByText, getAllByRole } = render(
        <Board nrows={1} ncols={3} chanceLightStartsOn={1} />,
      );

      expect(queryByText("You Won!")).not.toBeInTheDocument();

      const cells = getAllByRole("cell");
      fireEvent.click(cells[1]);

      expect(queryByText("You Won!")).toBeInTheDocument();
    });
  });
});
