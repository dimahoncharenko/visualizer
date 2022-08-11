// Imports libraries
import { ChangeEvent, MouseEvent, useState } from "react";

// Imports styled components
import {
  Header,
  NavContent,
  Button,
  Heading,
  Input,
  InputsWrapper,
  MenuWrapper,
  Menu,
  MenuItem,
} from "./styled";

// Imports redux stuff
import { useAppDispatch } from "../../redux";
import {
  computePath,
  clearMap,
  breadthSearch,
  depthSearch,
  setWidth,
  setHeight,
} from "../../redux/slices/graphMap";

export const Nav = () => {
  const [state, setState] = useState({
    width: 50,
    height: 35,
  });

  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeSize = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(clearMap());
    dispatch(setWidth(state.width));
    dispatch(setHeight(state.height));
  };

  return (
    <Header>
      <NavContent>
        <Heading>Pathfinder</Heading>
        <Button onClick={() => dispatch(clearMap())}>Clear Board</Button>
        <MenuWrapper isOpen={isOpen}>
          <Button onClick={() => setOpen(!isOpen)}>Choose Algorithm</Button>
          <Menu>
            <MenuItem
              onClick={() => {
                setOpen(false);
                dispatch(computePath());
              }}
            >
              Dijkstra's
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpen(false);
                dispatch(breadthSearch());
              }}
            >
              Breadth Search
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpen(false);
                dispatch(depthSearch());
              }}
            >
              Depth Search
            </MenuItem>
          </Menu>
        </MenuWrapper>
        <InputsWrapper>
          <Input
            type="number"
            name="width"
            onChange={handleChange}
            defaultValue={50}
          />
          <Input
            type="number"
            name="height"
            onChange={handleChange}
            defaultValue={35}
          />
        </InputsWrapper>
        <Button onClick={handleChangeSize}>Change Size</Button>
      </NavContent>
    </Header>
  );
};
