import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from "react-router-dom/server";
import ContextProvider from './context/context';

import { Router } from "./router";

export function render(path) {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
    <ContextProvider>
     <StaticRouter location={path}>
      <Router />
     </StaticRouter>
     </ContextProvider>
    </React.StrictMode>
  )
  return { html }
}
