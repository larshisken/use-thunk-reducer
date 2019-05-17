import { useReducer, useRef } from "react";

function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const thunk_dispatch_ref = useRef();

  const thunkDispatch = action =>
    typeof action === "function" ? action(thunk_dispatch_ref.current, state) : dispatch(action);
  thunk_dispatch_ref.current = thunkDispatch;
  
  return [state, thunkDispatch];
}

export default useThunkReducer;
