import styled from "@emotion/styled";

export const GridContainer = styled.div<{
  rows: number;
  cols: number;
}>`
  display: grid;
  width: 100vw;
  height: 100vh;
  gap: 0.1em;
  place-content: center;
  grid-template-columns: repeat(${(props) => props.cols}, 1em);
  grid-template-rows: repeat(${(props) => props.rows}, 1em);
`;
