import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { configureStore, history } from "./store/configureStore.prod";
import theme from "./utils/theme";
import Root from "./root";

const ThemeProvider = ({ theme: themeUI, children }) => {
  return <StyledThemeProvider theme={themeUI}>{children}</StyledThemeProvider>;
};

const { store } = configureStore();

window.__store = store;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Root history={history} store={store} />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

if (import.meta.hot) {
  import.meta.hot.accept();
}