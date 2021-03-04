import * as ActionTypes from "./actionTypes";

export function incrementCounter(increment) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.INCREMENT_COUNTER,
      increment,
    });
  };
}
