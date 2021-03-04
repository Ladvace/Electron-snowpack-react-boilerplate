import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import settings from "./settings/reducers";

const createRootReducer = (history) =>
  combineReducers({
    // ...reducers,
    settings,
    
    // this is needed in order for connect-react-router to work
    // if you don't need it, you can delete this line
    router: connectRouter(history),
  });

export default createRootReducer;
