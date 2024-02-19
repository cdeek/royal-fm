import './index.css';
import React from 'react';
import ContextProvider from './context/context';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import { Router } from "./router";


ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
   <ContextProvider>
     <BrowserRouter>
      <Router />
     </BrowserRouter> 
    </ContextProvider>
  </React.StrictMode>
)
