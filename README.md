# useThunkReducer

A thunk-like variant of React's useReducer hook

## Installation

```
yarn add use-thunk-reducer
```

## Usage

The `useThunkReducer` hook can be used to handle async side effects like sending AJAX requests. Dispatching a function allows the user to dispatch multiple actions, e.g. one starting the request, and one succesfully completing the request.

```javascript
import useThunkReducer from "use-thunk-reducer";

function getCountAction(dispatch) {
  dispatch({ type: GET_COUNT_REQUEST });

  fetchCount().then(count => {
    dispatch({ type: GET_COUNT_SUCCESS, value: count });
  });
}

function Component() {
  const [state, dispatch] = useThunkReducer(reducer, 0);

  if (state.status === NOT_ASKED) {
    dispatch(getCountAction);
  }

  return <p>{state.value}</p>;
}
```

Check out the `examples/` folder for a more elaborate example.
