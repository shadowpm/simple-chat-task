import type { ActionType } from "./actionTypes";
import type { State } from "./state";
import { initialState } from "./state";
import { createContext } from "react";

export const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});
