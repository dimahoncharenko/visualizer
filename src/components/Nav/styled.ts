import styled from "styled-components";

export const Header = styled.header`
  height: 4em;
  padding: 0 calc(50% - 450px);
  background-color: lightgrey;
`;

export const NavContent = styled.nav`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Heading = styled.h1`
  text-transform: uppercase;
  color: gold;
  text-shadow: 0em 0em 0.1em gray;
  cursor: default;
`;

export const Button = styled.button`
  --offset: 0.2em;

  border: none;
  border-radius: 0.5em;
  background-color: hsl(50, 100%, 60%);
  color: hsl(50, 100%, 30%);
  box-shadow: 0em var(--offset) 0em hsl(50, 100%, 30%);
  font-weight: bold;
  font-size: clamp(0.6rem, 2vw + 0.2rem, 0.8rem);
  padding: 0.5em;
  cursor: pointer;
  transition: all 0.2s linear;

  &:active {
    transform: translateY(var(--offset));
    box-shadow: 0em 0em 0em transparent, inset 0em 0em 0.1em gray;
  }

  & + & {
    margin-left: 1em;
  }
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  border-radius: 0.3em;
  border: 0.1em solid lightgray;
  padding: 0.3em;
`;

export const Menu = styled.ul`
  position: absolute;
  display: none;
  padding-left: 0;
  flex-direction: column;
  list-style: none;
  top: 0.4em;
  background-color: hsl(50, 100%, 60%);
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
`;

export const MenuWrapper = styled.div<{
  isOpen: boolean;
}>`
  position: relative;

  ${(props) =>
    props.isOpen &&
    `
    > ${Menu} {
      display: flex;
    }
  `}
`;

export const MenuItem = styled.li`
  padding: 0.5em;
  cursor: pointer;
  color: hsl(50, 100%, 30%);

  &:hover {
    color: white;
    background-color: hsl(50, 100%, 40%);
  }
`;
