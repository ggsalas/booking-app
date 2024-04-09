import React from "react";
import ReactDOM from "react-dom/client";
import {
  Provider as AdobeSpectrumProvider,
  defaultTheme,
} from "@adobe/react-spectrum";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./main.css";
import { setInitialData } from "./dataHandler";

setInitialData();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdobeSpectrumProvider theme={defaultTheme}>
      <RouterProvider router={router} />
    </AdobeSpectrumProvider>
  </React.StrictMode>
);
