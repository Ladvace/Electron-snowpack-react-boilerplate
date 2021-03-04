import { createStore, applyMiddleware, compose } from "redux";
import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "./thunkEnhancer";
import createRootReducer from "../reducers";

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const router = routerMiddleware(history);
const enhancer = compose(applyMiddleware(thunk, router));

function configureStore() {
  const store = createStore(rootReducer, enhancer);
  return { store };
}

export { configureStore, history };
