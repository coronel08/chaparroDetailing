import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router";

import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter basename="/">
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </BrowserRouter>
    </StrictMode>,
);
