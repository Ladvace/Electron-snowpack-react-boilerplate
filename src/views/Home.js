import React from "react";
// import os from "os";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

export default function Home() {
  const dispatch = useDispatch();
  // console.log("OS: ", os.cpus(), os.totalmem());
  return (
    <Container>
      Homeeee
      {/* {os.arch()} */}
      {/* {os.cpus()} */}
      {/* {os.uptime()} */}
      <button
        onClick={() => {
          console.log("redirect");
          dispatch(push("/test"));
        }}
      >
        click
      </button>
    </Container>
  );
}
