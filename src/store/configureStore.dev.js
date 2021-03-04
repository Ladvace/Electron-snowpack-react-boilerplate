import { createStore, applyMiddleware, compose } from "redux";
import { createHashHistory } from "history";
import { routerMiddleware, routerActions } from "connected-react-router";
import { createLogger } from "redux-logger";
import thunk from "./thunkEnhancer";
import createRootReducer from "../reducers";

const history = createHashHistory();
const rootReducer = createRootReducer(history);

const configureStore = () => {
  // Redux Configuration
  const middleware = [thunk];
  const enhancers = [];

  const logger = createLogger({
    collapsed: true,
    duration: true,
    colors: {
      title: () => "#8e44ad",
      prevState: () => "#9E9E9E",
      action: () => "#03A9F4",
      nextState: () => "#4CAF50",
      error: () => "#F20404",
    },
  });

  middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators,
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, enhancer);

  if (module.hot) {
    module.hot.accept(
      "../reducers",
      () => store.replaceReducer(require("../reducers")).default // eslint-disable-line global-require
    );
  }

  return { store };
};

export default { configureStore, history };
