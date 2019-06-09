import * as React from "react";
import {Suspense} from "react";
import {useRedirect, useRoutes} from 'hookrouter'
import LogicPane from "./LogicPane";
import QMPane from "./QMPane";

// const QMPane = lazy(() => import('./QMPane'));
// const LogicPane = lazy(() => import('./LogicPane'));


const routes = {
  '/boolean-expression': () => <LogicPane/>,
  '/qm': () => <QMPane/>,
};

export default function Content(props) {
  useRedirect('/', '/boolean-expression')
  const route = useRoutes(routes);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {route || 'Content not found'}
    </Suspense>
  )
}
