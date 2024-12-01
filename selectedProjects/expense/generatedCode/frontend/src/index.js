import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";
import "./index.css";
const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    {" "}
    <QueryClientProvider client={queryClient}>
      {" "}
      <BrowserRouter>
        <AuthProvider>
          {" "}
          <App />{" "}        
        </AuthProvider>{" "}
      </BrowserRouter>{" "}
    </QueryClientProvider>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);
