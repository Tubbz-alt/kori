import * as React from "react";
import {Suspense} from "react";
import {setBasepath, useRedirect, useRoutes} from 'hookrouter'

export default function Route({
                                routes,
                                basePath = null,
                                redirects = [],
                                notfound = 'Content not found',
                                loading = (<div>Loading...</div>)
                              }) {
  if (basePath) {
    setBasepath(basePath);
  }
  redirects.forEach(v => useRedirect(v[0], v[1]));

  const route = useRoutes(routes);
  return (
    <Suspense fallback={loading}>
      {route || notfound}
    </Suspense>
  )
}
