// Imports redux stuff
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Imports additional functionality
import {
  SimpleGraphScheme,
  generateGrid,
  SimpleVertice,
  Cell,
  dijkstraSearchValue,
  getPath,
  breadthTraverse,
  depthTraverse,
} from "../../utils";

type State = {
  width: number;
  height: number;
  graph: SimpleGraphScheme<Cell>;
  start: SimpleVertice<Cell> | null;
  dest: SimpleVertice<Cell> | null;
  path: SimpleVertice<Cell>[];
};

type InitMapPayload = {
  width: number;
  height: number;
};

type ChangeNodePayload = {
  node: SimpleVertice<Cell>;
};

const mapReducer = createSlice({
  name: "map",
  initialState: {
    width: 50,
    height: 35,
    graph: {},
    start: null,
    dest: null,
    path: [],
  } as State,
  reducers: {
    initMap: (state, action: PayloadAction<InitMapPayload>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;

      state.graph = generateGrid(state.width, state.height).graph;
    },
    clearMap: (state) => {
      state.path = [];
      state.dest = null;
      state.start = null;
      state.graph = generateGrid(state.width, state.height).graph;
    },
    computePath: (state) => {
      if (!state.start || !state.dest) return;

      const { previousVertices } = dijkstraSearchValue(
        state.graph,
        state.start.key
      );
      state.path = getPath(previousVertices, state.dest);
    },
    breadthSearch: (state) => {
      if (!state.start || !state.dest) return;

      state.graph = breadthTraverse(
        Object.assign({}, state.graph),
        state.start.key,
        state.dest.key
      );
    },
    depthSearch: (state) => {
      if (!state.start || !state.dest) return;
      state.graph = depthTraverse(
        Object.assign({}, state.graph),
        state.start.key,
        state.dest.key
      );
    },
    setStart: (state, action: PayloadAction<SimpleVertice<Cell>>) => {
      state.start = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      if (action.payload === state.height) return;
      state.height = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      if (action.payload === state.width) return;
      state.width = action.payload;
    },
    setDest: (state, action: PayloadAction<SimpleVertice<Cell>>) => {
      state.dest = action.payload;
    },
    changeNode: (state, action: PayloadAction<ChangeNodePayload>) => {
      if (state.graph[action.payload.node.key]) {
        state.graph = {
          ...state.graph,
          [action.payload.node.key]: action.payload.node,
        };
      }
    },
  },
});

export const {
  initMap,
  clearMap,
  computePath,
  setDest,
  setStart,
  changeNode,
  breadthSearch,
  depthSearch,
  setHeight,
  setWidth,
} = mapReducer.actions;
export default mapReducer.reducer;
