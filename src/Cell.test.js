import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

describe("Cell Component", function () {
  it("should render without crashing", function () {
    render(<Cell />);
  });

  it("should match the snapshot when lit", function () {
    const { asFragment } = render(<Cell isLit />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should match the snapshot when not lit", function () {
    const { asFragment } = render(<Cell />);
    expect(asFragment()).toMatchSnapshot();
  });
});
