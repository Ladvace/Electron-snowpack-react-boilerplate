import React, { lazy, Suspense } from "react";

const Home = lazy(() => import("../views/Home"));
const Test = lazy(() => import("../views/Test"));

function AsyncComponent(MyComponent) {
  return (props) => (
    <Suspense fallback={null}>
      <MyComponent {...props} />
    </Suspense>
  );
}

const routes = [
  {
    path: "/",
    exact: true,
    component: AsyncComponent(Home),
  },
  {
    path: "/test",
    component: AsyncComponent(Test),
  },
];

export default routes;
