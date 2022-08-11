// Imports libraries
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Imports slices
import map from "../redux/slices/graphMap";

const rootReducer = configureStore({
  reducer: combineReducers({ map }),
  middleware: [],
});

export type State = ReturnType<typeof rootReducer.getState>;
type AppDispatch = typeof rootReducer.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export default rootReducer;
