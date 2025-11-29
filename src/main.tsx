import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App.tsx";
import { HeroProvider } from "./app/providers/HeroUiProvider/HeroProvider.tsx";
import "@/app/styles/globals.css";
import { TanStackProvider } from "./app/providers/TanstackProvider/index.ts";
import { ToastProvider } from "./app/providers/ToastProvider/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TanStackProvider>
        <HeroProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </HeroProvider>
      </TanStackProvider>
    </BrowserRouter>
  </React.StrictMode>
);
