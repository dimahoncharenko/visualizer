// Imports libraries
import { Fragment, MouseEvent, useEffect } from "react";

// Imports types
import { SimpleVertice, Cell as TCell } from "../../utils";

// Imports styled components
import { GridContainer } from "./styled";

// Imports components
import { Cell } from "../Cell";

// Imports redux stuff
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  initMap,
  changeNode,
  setDest,
  setStart,
} from "../../redux/slices/graphMap";

export const Grid = () => {
  const { graph, start, dest, path, height, width } = useAppSelector(
    (state) => state.map
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initMap({ width, height }));
  }, [width, height]);

  const handleClick = (node: SimpleVertice) => {
    if (start && dest) return;

    if (!start) {
      dispatch(setStart(node));
    } else {
      dispatch(setDest(node));
    }
  };

  const handleMouseOver = (e: MouseEvent, node: SimpleVertice<TCell>) => {
    if (e.buttons === 1 && dest && start) {
      if (node.value.wall) return;

      const updatedNode = node;
      node.value.wall = true;

      dispatch(changeNode({ node: updatedNode }));
    }
  };

  return (
    <>
      <GridContainer rows={height} cols={width}>
        {Object.entries(graph).map(([key, node]) => (
          <Fragment key={key}>
            <Cell
              cell={
                node.value.wall
                  ? "blocked"
                  : start && start.key === key
                  ? "start"
                  : dest && dest.key === key
                  ? "end"
                  : path.includes(node) || node.value.visited
                  ? "visited"
                  : "empty"
              }
              onMouseOver={(e) => handleMouseOver(e, node)}
              onClick={() => {
                handleClick(node);
              }}
            />
          </Fragment>
        ))}
      </GridContainer>
    </>
  );
};
