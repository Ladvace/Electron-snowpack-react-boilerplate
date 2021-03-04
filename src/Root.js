import React from "react";
import { Switch, Route } from "react-router";
import styled, { createGlobalStyle } from "styled-components";
import routes from "./utils/routes";
import NavBar from "./components/NavBar";
import RouteBackground from "./components/RouteBackground";

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;   
    margin: 0;
    overflow: hidden;
    display: flex;
    -webkit-transform:translate3d(0,0,0);
    -webkit-font-smoothing: antialiased;
  }
  
  #root {
    color: ${(props) => props.theme.palette.text.primary};
    font-family: Inter, Roboto, Helvetica, sans-serif;
    font-size: 14px;
    height: 100%;
    overflow: hidden;
    margin: 0;
    display: flex;
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
`;

const MainContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.sizes.height.systemNavbar}px;
  height: calc(100vh - ${(props) => props.theme.sizes.height.systemNavbar}px);
  width: 100vw;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  will-change: transform;
`;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default function root() {
  return (
    <Wrapper>
      <NavBar />
      <MainContainer>
        <GlobalStyles />
        <RouteBackground />
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} /> // eslint-disable-line
          ))}
        </Switch>
      </MainContainer>
    </Wrapper>
  );
}
