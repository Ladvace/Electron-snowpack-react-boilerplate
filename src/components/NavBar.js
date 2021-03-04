import React, { useState, useEffect } from "react";
// import { ipcRenderer } from "electron";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMinimize,
  faWindowMaximize,
  faWindowRestore,
  faTimes,
  faTerminal,
  faCog,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const MainContainer = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.sizes.height.systemNavbar}px;
  background: ${({ theme }) => theme.palette.grey[900]};
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 100000;
  & > * {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.1s ease-in-out;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  -webkit-app-region: drag;
  & > * {
    width: ${({ theme }) => theme.sizes.height.systemNavbar}px;
    height: 100%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    &:hover {
      background: ${({ theme }) => theme.palette.grey[700]};
    }
    &:active {
      background: ${({ theme }) => theme.palette.grey[600]};
    }
  }
  & > *:last-child {
    &:hover {
      background: ${({ theme }) => theme.palette.colors.red};
    }
  }
`;

export default function NavBar() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    window.api
      .send("getIsWindowMaximized")
      .then(setIsMaximized)
      .catch(console.error);
    window.api.receive("window-maximized", () => {
      setIsMaximized(true);
    });
    window.api.receive("window-minimized", () => {
      setIsMaximized(false);
    });
  }, []);

  return (
    <MainContainer
    // onDoubleClick={() => {
    //   if (process.platform === "darwin") {
    //     ipcRenderer.invoke("min-max-window");
    //     window.api.send("min-max-window");
    //   }
    // }}
    >
      <Container>
        <div
          onClick={() => {
            window.api.send("minimize-window");
          }}
          css={`
            -webkit-app-region: no-drag;
          `}
        >
          <FontAwesomeIcon icon={faWindowMinimize} />
        </div>
        <div
          onClick={() => window.api.send("min-max-window")}
          css={`
            -webkit-app-region: no-drag;
          `}
        >
          <FontAwesomeIcon
            icon={isMaximized ? faWindowRestore : faWindowMaximize}
          />
        </div>
        <div
          css={`
            font-size: 18px;
            -webkit-app-region: no-drag;
          `}
          onClick={() => window.api.send("quit-app")}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </Container>
    </MainContainer>
  );
}
