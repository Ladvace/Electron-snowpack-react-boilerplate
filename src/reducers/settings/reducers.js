import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";

function counter(state = 0, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_SOUNDS:
      return state + action.increment;
    default:
      return state;
  }
}

export default combineReducers({
  counter,
});
