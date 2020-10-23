import React from "react";
import { render } from "@testing-library/react";
import Snake from "./Snake";

describe("snake component", () => {
  const defaultQueue: [number, number][] = [
    [10, 10],
    [10, 11],
    [10, 12]
  ];
  it("should render without error", () => {
    render(<Snake snakeQueue={defaultQueue} />);
  });
});
