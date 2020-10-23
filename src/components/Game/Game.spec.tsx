import React from "react";
import { render } from "@testing-library/react";
import Game from "./Game";

describe("Game component", () => {
  it("Should render without error", () => {
    render(<Game />);
  });
});
