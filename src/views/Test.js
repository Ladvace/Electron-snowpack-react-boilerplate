import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

export default function Test() {
  const dispatch = useDispatch();

  return (
    <div>
      Test
      <button
        onClick={() => {
          console.log("redirect");
          dispatch(push("/"));
        }}
      >
        click
      </button>
    </div>
  );
}
