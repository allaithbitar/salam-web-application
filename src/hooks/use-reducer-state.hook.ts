import { useReducer } from "react";

function useReducerState<T>(initialState: T | (() => T)) {
  const [state, onChange] = useReducer(
    (curr: T, update: Partial<T> | ((state: T) => T)) => ({
      ...curr,
      ...(typeof update === "function" ? update(curr) : update),
    }),
    typeof initialState !== "function" ? initialState : (undefined as any),
    typeof initialState === "function" ? initialState : (undefined as any),
  );
  return [state, onChange];
}

export default useReducerState;
