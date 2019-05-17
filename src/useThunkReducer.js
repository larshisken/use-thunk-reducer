import { useReducer, useRef } from "react";

function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const thunkDispatchRef = useRef();

  const thunkDispatch = action =>
    typeof action === "function"
      ? action(thunkDispatchRef.current, state)
      : dispatch(action);

  thunkDispatchRef.current = thunkDispatch;

  return [state, thunkDispatch];
}

export default useThunkReducer;
