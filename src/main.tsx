import { Buffer } from 'buffer';
(globalThis as Record<string, unknown>).Buffer = Buffer;

import './index.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
