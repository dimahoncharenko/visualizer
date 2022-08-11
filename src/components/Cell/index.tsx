// Imports libraries
import { MouseEventHandler, TouchEventHandler, memo } from "react";

// Imports styled components
import { CellContainer } from "./styled";

type Props = {
  cell: "empty" | "end" | "start" | "visited" | "blocked";
  onClick?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onDoubleClick?: MouseEventHandler;
  children?: React.ReactNode;
};

const CellComponent = ({
  cell,
  children,
  onClick = () => {},
  onDoubleClick = () => {},
  onMouseOver = () => {},
}: Props) => {
  return (
    <CellContainer
      onMouseOver={onMouseOver}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      type={cell}
    >
      {children}
    </CellContainer>
  );
};

export const Cell = memo(CellComponent);
