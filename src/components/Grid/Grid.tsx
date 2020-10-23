import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Position } from "../../util/position";

interface Size {
  rows: number;
  cols: number;
}

interface GridProps {
  className?: string;
  size: Size;
  children: ReactNode;
  style?: CSSProperties;
}

export function Grid(props: GridProps) {
  const { className = "", size, children, style } = props;

  const styles = useMemo(() => {
    const colSize = 100 / size.cols;
    const rowSize = 100 / size.rows;
    return {
      gridTemplateColumns: `repeat(${size.cols}, ${colSize}%)`,
      gridTemplateRows: `repeat(${size.rows}, ${rowSize}%)`,
      ...style
    };
  }, [size, style]);

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
}

interface CellProps {
  position: Position;
  className?: string;
}

function Cell(props: CellProps) {
  const {
    position: [x, y],
    className = ""
  } = props;

  return (
    <span
      className={"cell " + className}
      style={{
        gridArea: `${y} / ${x}`
      }}
    />
  );
}

Grid.Cell = Cell;
export default Grid;
