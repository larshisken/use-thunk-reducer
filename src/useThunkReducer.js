import { useReducer } from "react";

function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = action =>
    typeof action === "function" ? action(dispatch, state) : dispatch(action);

  return [state, thunkDispatch];
}

export default useThunkReducer;
