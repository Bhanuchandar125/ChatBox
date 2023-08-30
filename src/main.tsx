import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Provider}  from 'react-redux';
import Store from './ReduxToolkit/Store.ts'

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryclient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryclient}>
    <Provider store={Store}>

    <App />
    </Provider>
  </QueryClientProvider>
);
