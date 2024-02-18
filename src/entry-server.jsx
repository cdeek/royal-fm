import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from "react-router-dom/server";

import { Router } from "./router";

export function render(path) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
     <StaticRouter location={path}>
      <Router />
     </StaticRouter>
    </React.StrictMode>
  )
  return { html }
}
