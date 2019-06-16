import * as React from 'react';
import ReactDOM from 'react-dom';
import Route from './pages/Route';
import Layout from './pages/Layout';
import {basePath, menus, redirects, routes} from './routes';
import './i18n'

function App() {
  return (
    <>
      <Layout menus={menus}>
        <Route
          basePath={basePath}
          routes={routes}
          redirects={redirects}
        />
      </Layout>
    </>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'));
