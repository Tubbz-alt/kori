import * as React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LinkIcon from '@material-ui/icons/Link';

import LogicPane from "./pages/LogicPane";
import QMPane from "./pages/QMPane";
import Typography from "@material-ui/core/Typography";
// const QMPane = lazy(() => import('./QMPane'));
// const LogicPane = lazy(() => import('./LogicPane'));

export const menus = [
  {
    label: 'Home',
    link: '/',
    icon: <DashboardIcon/>
  },
  {
    label: 'Boolean Expression',
    link: '/boolean-expression',
    icon: (
      <Typography component="div">
        BE
      </Typography>
    ),
  },
  {
    label: 'Quine–McCluskey algorithm',
    link: '/qm',
    icon: (
      <Typography component="div">
        QM
      </Typography>
    ),
  },
  {
    label: 'Github',
    link: 'https://github.com/wenerme/kori',
    icon: <LinkIcon/>
  },
];

export const basePath = '/kori';
export const redirects = [
  ['/', '/boolean-expression']
];

export const routes = {
  '/boolean-expression': () => <LogicPane/>,
  '/qm': () => <QMPane/>,
};

