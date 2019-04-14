import React from "react";
import useThunkReducer from "use-thunk-reducer";

const GET_COUNTRY_REQUEST = "GET_COUNTRY_REQUEST";
const GET_COUNTRY_SUCCESS = "GET_COUNTRY_SUCCESS";
const GET_COUNTRY_FAILURE = "GET_COUNTRY_FAILURE";

const NOT_ASKED = "NOT_ASKED";
const LOADING = "LOADING";
const FAILURE = "FAILURE";
const SUCCESS = "SUCCESS";

function reducer(state, action) {
  switch (action.type) {
    case GET_COUNTRY_REQUEST: {
      return {
        ...state,
        status: LOADING
      };
    }
    case GET_COUNTRY_FAILURE: {
      return {
        ...state,
        status: FAILURE
      };
    }
    case GET_COUNTRY_SUCCESS: {
      return {
        ...state,
        status: SUCCESS,
        value: action.payload
      };
    }
  }
}

async function fetchCountryAction(dispatch) {
  dispatch({ type: GET_COUNTRY_REQUEST });

  try {
    const response = await fetch("https://ipinfo.io/country");
    const country = await response.text();

    dispatch({ type: GET_COUNTRY_SUCCESS, payload: country });
  } catch {
    dispatch({ type: GET_COUNTRY_FAILURE });
  }
}

function Country() {
  const [state, dispatch] = useThunkReducer(reducer, {
    status: NOT_ASKED,
    value: ""
  });

  switch (state.status) {
    case SUCCESS: {
      return <p>{state.value}</p>;
    }
    case LOADING: {
      return <p>Loading your country...</p>;
    }
    default: {
      return (
        <button onClick={() => dispatch(fetchCountryAction)}>
          Get country
        </button>
      );
    }
  }
}

export default Country;
