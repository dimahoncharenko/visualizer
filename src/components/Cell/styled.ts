import styled from "@emotion/styled";

export const CellContainer = styled.div<{
  type: "empty" | "start" | "end" | "visited" | "blocked";
}>`
  --size: 1em;

  width: var(--size);
  height: var(--size);

  transition: background-color 0.3s ease-in-out;

  background-color: ${(props) =>
    props.type === "empty"
      ? "lightgray"
      : props.type === "start"
      ? "hsl(120, 60%, 70%)"
      : props.type === "visited"
      ? "gold"
      : props.type === "blocked"
      ? "gray"
      : "indianred"};
`;
